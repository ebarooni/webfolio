package dev.barooni.fallback;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.InputStream;
import java.util.Optional;
import java.util.Set;
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

  /** The name of the app shell when the build prerenders the pages. */
  private static final String PRERENDER_SHELL = "index.csr.html";

  /**
   * App routes that the build does not prerender, because they depend on the visitor. All other
   * pages are prerendered in every language, so an address without a prerendered page does not
   * exist.
   */
  private static final Set<String> CLIENT_ROUTES = Set.of("access-denied");

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
   * A page names the hashed script and style files of the build that made it. After a deploy those
   * files are gone, so a page from the browser cache loads no app: the theme button and the menus
   * do nothing until a reload. The browser may keep a page, but must ask the server before it shows
   * it again.
   */
  static final String PAGE_CACHE_CONTROL = "no-cache";

  /**
   * Handles all GET requests that were not matched by a more specific route. A route that the
   * Angular build prerendered gets its own HTML, so that search engines read the full page. The
   * build prerenders every public page in every language ("/", "/de/...", "/nl/..."). Any other
   * address gets the client-rendered app shell with status 404, so that search engines and API
   * clients do not take it for a page. The app then shows its "not found" page in the language of
   * the address. Only the routes in {@link #CLIENT_ROUTES} get the shell with status 200.
   *
   * <p>A frontend build without prerendered pages has no {@code index.csr.html}. Then every address
   * without a file extension is an app route, as before prerendering.
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
      return Response.ok(prerendered.get())
          .header(HttpHeaders.CACHE_CONTROL, PAGE_CACHE_CONTROL)
          .build();
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
        isClientRoute(path, exists(RESOURCE_ROOT + PRERENDER_SHELL))
            ? Response.Status.OK
            : Response.Status.NOT_FOUND;

    return Response.status(status)
        .entity(shell.get())
        .header(HttpHeaders.CACHE_CONTROL, PAGE_CACHE_CONTROL)
        .build();
  }

  /**
   * Tells whether the app shell is the right page for an address that has no prerendered page.
   *
   * @param path the requested path without the leading slash
   * @param pagesArePrerendered true when the frontend build prerendered its pages
   * @return true for an app route, false for an address that does not exist
   */
  static boolean isClientRoute(String path, boolean pagesArePrerendered) {
    if (FILE_PATH.matcher(path).matches()) {
      return false;
    }

    if (!pagesArePrerendered) {
      return true;
    }

    String route = path.endsWith("/") ? path.substring(0, path.length() - 1) : path;

    return CLIENT_ROUTES.contains(route);
  }

  /**
   * Gives the class path name of the prerendered HTML for a route. The Angular build writes the
   * page for "plugins/example" to "plugins/example/index.html", and the home page to "index.html".
   *
   * @param path the requested path without the leading slash
   * @return the resource name, or empty when the path cannot be a prerendered route
   */
  static Optional<String> prerenderedPageResource(String path) {
    String route = path.endsWith("/") ? path.substring(0, path.length() - 1) : path;

    if (route.isEmpty()) {
      return Optional.of(RESOURCE_ROOT + "index.html");
    }

    if (!PAGE_PATH.matcher(route).matches()) {
      return Optional.empty();
    }

    return Optional.of(RESOURCE_ROOT + route + "/index.html");
  }

  private static boolean exists(String resourceName) {
    return Thread.currentThread().getContextClassLoader().getResource(resourceName) != null;
  }

  private Optional<InputStream> open(String resourceName) {
    return Optional.ofNullable(
        Thread.currentThread().getContextClassLoader().getResourceAsStream(resourceName));
  }
}
