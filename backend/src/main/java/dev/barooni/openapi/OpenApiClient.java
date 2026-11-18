package dev.barooni.openapi;

import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

/** REST client for fetching the OpenAPI specification of the current application. */
@RegisterRestClient(configKey = "open-api-client")
@Path("/q/openapi")
public interface OpenApiClient {

  /**
   * Gets the OpenAPI specification of this application.
   *
   * @param format the output format, for example {@code json} or {@code yaml}
   * @return the specification as text
   */
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  String getOpenApiJson(@QueryParam("format") @DefaultValue("json") final String format);
}
