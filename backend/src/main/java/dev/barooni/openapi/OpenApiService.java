package dev.barooni.openapi;

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
  
  private final AtomicReference<String> cachedJson = new AtomicReference<>();
  
  /**
   * Returns the loaded JSON content.
   */
  public String getJson() {
    return cachedJson.updateAndGet(
      current -> current != null ? current : openApiClient.getOpenApiJson("json")
    );
  }
}
