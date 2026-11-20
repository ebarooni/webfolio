package dev.barooni.fallback;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.InputStream;
import java.util.regex.Pattern;

/** Catch all endpoint used to support Angular SPA routing. */
@Path("/")
public class FallbackResource {

  /** An unknown address under the REST API is never a page of the app. */
  private static final String API_PREFIX = "api/";

  /**
   * A last path segment with a file extension asks for a file, for example "/profile.jpeg". The app
   * routes have no extensions, so such a file does not exist.
   */
  private static final Pattern FILE_PATH = Pattern.compile("(^|.*/)[^/]*\\.[A-Za-z0-9]+$");

  /**
   * Handles all GET requests that were not matched by a more specific route and returns the Angular
   * application's index.html. A request for a missing file or an unknown API address gets status
   * 404, so that search engines and API clients do not take it for a page. The app then shows its
   * "not found" page.
   *
   * @param path the requested path without the leading slash
   * @return index.html with status 200 for an app route, or status 404
   */
  @GET
  @Path("{path: .*}")
  @Produces(MediaType.TEXT_HTML)
  public Response index(@PathParam("path") String path) {
    if (path.equals("api") || path.startsWith(API_PREFIX)) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    InputStream index =
        Thread.currentThread()
            .getContextClassLoader()
            .getResourceAsStream("META-INF/resources/index.html");

    if (index == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    Response.Status status =
        FILE_PATH.matcher(path).matches() ? Response.Status.NOT_FOUND : Response.Status.OK;

    return Response.status(status).entity(index).build();
  }
}
