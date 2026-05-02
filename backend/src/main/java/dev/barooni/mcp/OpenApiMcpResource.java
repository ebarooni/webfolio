package dev.barooni.mcp;

import dev.barooni.openapi.OpenApiService;
import io.quarkiverse.mcp.server.Resource;
import io.quarkiverse.mcp.server.TextResourceContents;
import jakarta.inject.Inject;

/**
* MCP resource exposing the WebFolio OpenAPI specification as JSON.
*/
public class OpenApiMcpResource {

  @Inject
  OpenApiService openApiService;
  
  /**
  * Returns the full OpenAPI specification for WebFolio as JSON.
  */
  @Resource(
      uri = "webfolio://openapi",
      name = "OpenAPI Specification",
      description = "Full OpenAPI specification of WebFolio in JSON format",
      mimeType = "application/json"
  )
  public TextResourceContents getOpenApiSpec() {
    return TextResourceContents.create("webfolio://openapi", openApiService.getJson());
  }
}
