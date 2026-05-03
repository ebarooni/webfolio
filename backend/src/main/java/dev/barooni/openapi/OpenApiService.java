package dev.barooni.openapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.concurrent.atomic.AtomicReference;
import org.eclipse.microprofile.rest.client.inject.RestClient;

/**
* Service class for caching the loaded OpenAPI spec.
*/
@ApplicationScoped
public class OpenApiService {
  
  @Inject
  @RestClient
  OpenApiClient openApiClient;
  
  @Inject
  ObjectMapper objectMapper;
  
  private final AtomicReference<String> cachedJson = new AtomicReference<>();
  private final AtomicReference<JsonNode> cachedPaths = new AtomicReference<>();
  
  /**
  * Returns the loaded JSON content.
  */
  public String getJson() {
    return cachedJson.updateAndGet(
      current -> current != null ? current : openApiClient.getOpenApiJson("json")
    );
  }
  
  /**
  * Returns the parsed {@code paths} node from the OpenAPI spec, loading it lazily on first call.
  */
  public JsonNode getPaths() {
    return cachedPaths.updateAndGet(current -> {
      if (current != null) {
        return current;
      }

      try {
        return objectMapper.readTree(getJson()).path("paths");
      } catch (Exception exception) {
        throw new IllegalStateException("Failed to parse OpenAPI spec", exception);
      }
    });
  }
}
