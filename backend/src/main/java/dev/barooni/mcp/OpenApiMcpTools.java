package dev.barooni.mcp;

import com.fasterxml.jackson.databind.JsonNode;
import dev.barooni.openapi.OpenApiService;
import io.quarkiverse.mcp.server.Tool;
import io.quarkiverse.mcp.server.ToolArg;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
* MCP tools for querying the WebFolio OpenAPI specification.
*/
public class OpenApiMcpTools {
  
  private static final Logger LOGGER = Logger.getLogger(OpenApiMcpTools.class.getName());
  
  @Inject
  OpenApiService openApiService;
  
  /**
  * Searches for endpoints whose path, summary, description, or tags contain the given keyword.
  */
  @Tool(description = "Search for REST endpoints by keyword in path, summary, description or tags")
  public String searchEndpoint(
      @ToolArg(description = "Keyword to search for, e.g. 'contact', 'form'") final String keyword
  ) {
    LOGGER.log(Level.INFO, "[searchEndpoint] request for keyword: %s".formatted(keyword));
    if (keyword == null || keyword.isBlank()) {
      return "Please provide a keyword to search for.";
    }
    
    final String normalized = keyword.toLowerCase().trim();
    final List<String> matches = new ArrayList<>();
    
    openApiService.getPaths().properties().forEach(pathEntry -> {
      final String path = pathEntry.getKey();
      
      pathEntry.getValue().properties().forEach(methodEntry -> {
        final JsonNode operation = methodEntry.getValue();
        
        if (matchesKeyword(path, operation, normalized)) {
          final String method = methodEntry.getKey().toUpperCase();
          final String summary = operation.path("summary").asText("");
          matches.add("%s %s — %s".formatted(method, path, summary));
        }
      });
    });
    
    if (matches.isEmpty()) {
      return "No endpoints found matching '%s'.".formatted(keyword);
    }
    
    return "Endpoints matching '%s':\n%s".formatted(keyword, String.join("\n", matches));
  }
  
  /**
  * Returns detailed information about a specific endpoint path, including all
  * HTTP methods, summaries, tags, and response codes.
  */
  @Tool(description = "Get detailed information about a specific API endpoint path")
  public String getEndpointDetails(
      @ToolArg(description = "The endpoint path, e.g. '/api/v1/contact-form'") final String path
  ) {
    if (path == null || path.isBlank()) {
      return "Please provide an endpoint path.";
    }
    
    final JsonNode pathNode = openApiService.getPaths().path(path.trim());
    if (pathNode.isMissingNode()) {
      return "No endpoint found for '%s'. Use searchEndpoint to find available paths."
        .formatted(path);
    }
    
    final StringBuilder details = new StringBuilder();
    details.append("Path: %s\n".formatted(path));
    
    pathNode.properties().forEach(methodEntry -> {
      final String method = methodEntry.getKey().toUpperCase();
      final JsonNode operation = methodEntry.getValue();
      
      details.append("\n[%s]\n".formatted(method));
      
      appendIfPresent(details, "Summary", operation.path("summary"));
      appendIfPresent(details, "Description", operation.path("description"));
      
      final JsonNode tags = operation.path("tags");
      if (tags.isArray()) {
        final List<String> tagList = new ArrayList<>();
        tags.forEach(tag -> tagList.add(tag.asText()));
        details.append("Tags: %s\n".formatted(String.join(", ", tagList)));
      }
      
      final JsonNode responses = operation.path("responses");
      if (!responses.isMissingNode()) {
        details.append("Responses:\n");
        responses.properties().forEach(responseEntry ->
            details.append("  %s: %s\n".formatted(
              responseEntry.getKey(),
              responseEntry.getValue().path("description").asText("")
            ))
        );
      }
    });
    
    return details.toString();
  }
  
  private boolean matchesKeyword(
      final String path, 
      final JsonNode operation, 
      final String keyword
  ) {
    if (path.toLowerCase().contains(keyword)) {
      return true;
    }
    if (operation.path("summary").asText("").toLowerCase().contains(keyword)) {
      return true;
    }
    if (operation.path("description").asText("").toLowerCase().contains(keyword)) {
      return true;
    }
    
    final JsonNode tags = operation.path("tags");
    if (tags.isArray()) {
      for (final JsonNode tag : tags) {
        if (tag.asText("").toLowerCase().contains(keyword)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  private void appendIfPresent(final StringBuilder sb, final String label, final JsonNode node) {
    if (!node.isMissingNode() && !node.asText("").isBlank()) {
      sb.append("%s: %s\n".formatted(label, node.asText()));
    }
  }
}
