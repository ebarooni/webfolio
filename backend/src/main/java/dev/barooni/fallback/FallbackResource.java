package dev.barooni.fallback;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.InputStream;
import java.util.Optional;
import java.util.regex.Pattern;

/** Catch all endpoint used to support Angular SPA routing. */
@Path("/")
public class FallbackResource {

  /** An unknown address under the REST API is never a page of the app. */
  private static final String API_PREFIX = "api/";

  private static final String RESOURCE_ROOT = "META-INF/resources/";

  /**
   * The client-rendered app shell. The Angular build gives it this name when it also prerenders
   * pages. Older builds without prerendered pages name it "index.html".
   */
  private static final String[] APP_SHELLS = {"index.csr.html", "index.html"};

  /**
   * A last path segment with a file extension asks for a file, for example "/profile.jpeg". The app
   * routes have no extensions, so such a file does not exist.
   */
  private static final Pattern FILE_PATH = Pattern.compile("(^|.*/)[^/]*\\.[A-Za-z0-9]+$");

  /**
   * Only lowercase route segments can have a prerendered page. This also keeps "..", "//" and other
   * unusual paths away from the class path lookup.
   */
  private static final Pattern PAGE_PATH = Pattern.compile("[a-z0-9-]+(/[a-z0-9-]+)*");

  /**
   * Handles all GET requests that were not matched by a more specific route. A route that the
   * Angular build prerendered gets its own HTML, so that search engines read the full page. Every
   * other route gets the client-rendered app shell. A request for a missing file or an unknown API
   * address gets status 404, so that search engines and API clients do not take it for a page. The
   * app then shows its "not found" page.
   *
   * @param path the requested path without the leading slash
   * @return the page HTML with status 200 for an app route, or status 404
   */
  @GET
  @Path("{path: .*}")
  @Produces(MediaType.TEXT_HTML)
  public Response index(@PathParam("path") String path) {
    if (path.equals("api") || path.startsWith(API_PREFIX)) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    Optional<InputStream> prerendered = prerenderedPageResource(path).flatMap(this::open);

    if (prerendered.isPresent()) {
      return Response.ok(prerendered.get()).build();
    }

    Optional<InputStream> shell = Optional.empty();

    for (String name : APP_SHELLS) {
      shell = open(RESOURCE_ROOT + name);

      if (shell.isPresent()) {
        break;
      }
    }

    if (shell.isEmpty()) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }

    Response.Status status =
        FILE_PATH.matcher(path).matches() ? Response.Status.NOT_FOUND : Response.Status.OK;

    return Response.status(status).entity(shell.get()).build();
  }

  /**
   * Gives the class path name of the prerendered HTML for a route. The Angular build writes the
   * page for "plugins/example" to "plugins/example/index.html".
   *
   * @param path the requested path without the leading slash
   * @return the resource name, or empty when the path cannot be a prerendered route
   */
  static Optional<String> prerenderedPageResource(String path) {
    String route = path.endsWith("/") ? path.substring(0, path.length() - 1) : path;

    if (!PAGE_PATH.matcher(route).matches()) {
      return Optional.empty();
    }

    return Optional.of(RESOURCE_ROOT + route + "/index.html");
  }

  private Optional<InputStream> open(String resourceName) {
    return Optional.ofNullable(
        Thread.currentThread().getContextClassLoader().getResourceAsStream(resourceName));
  }
}
