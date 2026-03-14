package dev.barooni.fallback;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.InputStream;

/**
 * Catch all endpoint used to support Angular SPA routing.
 */
@Path("/")
public class FallbackResource {
  
  /**
   * Handles all GET requests that were not matched by a more specific route 
   * and returns the Angular application's index.html.
   */
  @GET
  @Path("{path: .*}")
  @Produces(MediaType.TEXT_HTML)
  public Response index() {
    InputStream index = Thread.currentThread()
        .getContextClassLoader()
        .getResourceAsStream("META-INF/resources/index.html");
    
    if (index == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }
    
    return Response.ok(index).build();
  }
}