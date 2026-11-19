package dev.barooni.mcp;

import com.fasterxml.jackson.databind.JsonNode;
import dev.barooni.openapi.OpenApiService;
import io.quarkiverse.mcp.server.Tool;
import io.quarkiverse.mcp.server.Tool.Annotations;
import io.quarkiverse.mcp.server.ToolArg;
import io.quarkiverse.mcp.server.ToolCallException;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.logging.Level;
import java.util.logging.Logger;

/** MCP tools for querying the WebFolio OpenAPI specification. */
public class OpenApiMcpTools {

  private static final Logger LOGGER = Logger.getLogger(OpenApiMcpTools.class.getName());

  /** The keys of an OpenAPI path item that hold an operation. */
  private static final Set<String> HTTP_METHODS =
      Set.of("get", "put", "post", "delete", "options", "head", "patch", "trace");

  @Inject OpenApiService openApiService;

  /** Searches for endpoints whose path, summary, description, or tags contain the given keyword. */
  @Tool(
      description = "Search for REST endpoints by keyword in path, summary, description or tags",
      annotations =
          @Annotations(
              title = "Search API endpoints",
              readOnlyHint = true,
              destructiveHint = false,
              idempotentHint = true,
              openWorldHint = false))
  public String searchEndpoint(
      @ToolArg(description = "Keyword to search for, e.g. 'contact', 'form'")
          final String keyword) {
    if (keyword == null || keyword.isBlank()) {
      throw new ToolCallException("The keyword must not be blank.");
    }

    final String normalized = keyword.toLowerCase(Locale.ROOT).trim();
    final List<String> matches = new ArrayList<>();

    loadPaths()
        .properties()
        .forEach(pathEntry -> {
          final String path = pathEntry.getKey();

          forEachOperation(
              pathEntry.getValue(),
              (method, operation) -> {
                if (matchesKeyword(path, operation, normalized)) {
                  final String summary = operation.path("summary").asText("");
                  matches.add("%s %s — %s".formatted(method, path, summary));
                }
              });
        });

    LOGGER.log(Level.FINE, "[searchEndpoint] {0} match(es)", matches.size());

    if (matches.isEmpty()) {
      return "No endpoints found matching '%s'.".formatted(keyword);
    }

    return "Endpoints matching '%s':\n%s".formatted(keyword, String.join("\n", matches));
  }

  /**
   * Returns detailed information about a specific endpoint path, including all HTTP methods,
   * summaries, tags, parameters, request body, and response codes.
   */
  @Tool(
      description =
          "Get detailed information about a specific API endpoint path: its HTTP methods,"
              + " parameters, request body and response codes",
      annotations =
          @Annotations(
              title = "Get API endpoint details",
              readOnlyHint = true,
              destructiveHint = false,
              idempotentHint = true,
              openWorldHint = false))
  public String getEndpointDetails(
      @ToolArg(description = "The endpoint path, e.g. '/api/v1/contact-form'") final String path) {
    if (path == null || path.isBlank()) {
      throw new ToolCallException("The endpoint path must not be blank.");
    }

    final String trimmedPath = path.trim();
    final JsonNode pathNode = loadPaths().path(trimmedPath);
    if (pathNode.isMissingNode()) {
      throw new ToolCallException(
          "No endpoint found for '%s'. Use searchEndpoint to find available paths."
              .formatted(trimmedPath));
    }

    final StringBuilder details = new StringBuilder();
    details.append("Path: %s\n".formatted(trimmedPath));

    forEachOperation(
        pathNode,
        (method, operation) -> {
          details.append("\n[%s]\n".formatted(method));

          appendIfPresent(details, "Summary", operation.path("summary"));
          appendIfPresent(details, "Description", operation.path("description"));
          appendTags(details, operation.path("tags"));
          appendParameters(details, pathNode.path("parameters"), operation.path("parameters"));
          appendRequestBody(details, operation.path("requestBody"));
          appendResponses(details, operation.path("responses"));
        });

    return details.toString();
  }

  /**
   * Loads the {@code paths} node of the OpenAPI spec and reports a failure as a tool error, so that
   * the client sees what went wrong instead of a generic protocol error.
   */
  private JsonNode loadPaths() {
    try {
      return openApiService.getPaths();
    } catch (RuntimeException exception) {
      LOGGER.log(Level.WARNING, "Failed to load the OpenAPI spec", exception);
      throw new ToolCallException("The OpenAPI spec could not be loaded. Try again later.");
    }
  }

  /** Calls the consumer for each operation of a path item, skipping keys that are not methods. */
  private static void forEachOperation(
      final JsonNode pathItem, final BiConsumer<String, JsonNode> consumer) {
    pathItem
        .properties()
        .forEach(entry -> {
          final String key = entry.getKey().toLowerCase(Locale.ROOT);
          if (HTTP_METHODS.contains(key)) {
            consumer.accept(key.toUpperCase(Locale.ROOT), entry.getValue());
          }
        });
  }

  private static boolean matchesKeyword(
      final String path, final JsonNode operation, final String keyword) {
    if (path.toLowerCase(Locale.ROOT).contains(keyword)
        || containsKeyword(operation.path("summary"), keyword)
        || containsKeyword(operation.path("description"), keyword)) {
      return true;
    }

    for (final JsonNode tag : operation.path("tags")) {
      if (containsKeyword(tag, keyword)) {
        return true;
      }
    }

    return false;
  }

  private static boolean containsKeyword(final JsonNode node, final String keyword) {
    return node.asText("").toLowerCase(Locale.ROOT).contains(keyword);
  }

  private static void appendIfPresent(
      final StringBuilder sb, final String label, final JsonNode node) {
    if (!node.isMissingNode() && !node.asText("").isBlank()) {
      sb.append("%s: %s\n".formatted(label, node.asText()));
    }
  }

  private static void appendTags(final StringBuilder sb, final JsonNode tags) {
    if (tags.isArray() && !tags.isEmpty()) {
      final List<String> tagList = new ArrayList<>();
      tags.forEach(tag -> tagList.add(tag.asText()));
      sb.append("Tags: %s\n".formatted(String.join(", ", tagList)));
    }
  }

  private static void appendParameters(
      final StringBuilder sb, final JsonNode pathParameters, final JsonNode operationParameters) {
    final List<JsonNode> parameters = new ArrayList<>();
    pathParameters.forEach(parameters::add);
    operationParameters.forEach(parameters::add);
    if (parameters.isEmpty()) {
      return;
    }

    sb.append("Parameters:\n");
    for (final JsonNode parameter : parameters) {
      sb.append(
          "  %s (in %s%s)%s\n"
              .formatted(
                  parameter.path("name").asText(parameter.path("$ref").asText("?")),
                  parameter.path("in").asText("?"),
                  parameter.path("required").asBoolean(false) ? ", required" : "",
                  describeSchema(parameter.path("schema"))));
    }
  }

  private static void appendRequestBody(final StringBuilder sb, final JsonNode requestBody) {
    if (requestBody.isMissingNode()) {
      return;
    }

    sb.append(
        "Request body%s:\n"
            .formatted(requestBody.path("required").asBoolean(false) ? " (required)" : ""));
    for (final Map.Entry<String, JsonNode> media : requestBody.path("content").properties()) {
      sb.append(
          "  %s%s\n".formatted(media.getKey(), describeSchema(media.getValue().path("schema"))));
    }
  }

  private static void appendResponses(final StringBuilder sb, final JsonNode responses) {
    if (responses.isMissingNode()) {
      return;
    }

    sb.append("Responses:\n");
    responses
        .properties()
        .forEach(responseEntry ->
            sb.append(
                "  %s: %s\n"
                    .formatted(
                        responseEntry.getKey(),
                        responseEntry.getValue().path("description").asText(""))));
  }

  /** Returns a short schema label such as {@code → ContactForm} or {@code → string}. */
  private static String describeSchema(final JsonNode schema) {
    final String ref = schema.path("$ref").asText("");
    if (!ref.isBlank()) {
      return " → " + ref.substring(ref.lastIndexOf('/') + 1);
    }
    final String type = schema.path("type").asText("");
    return type.isBlank() ? "" : " → " + type;
  }
}
