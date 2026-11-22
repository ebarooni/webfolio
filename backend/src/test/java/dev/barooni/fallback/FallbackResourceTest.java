package dev.barooni.fallback;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;

import dev.barooni.telegram.WireMockTelegram;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

// The app needs the Telegram settings to start, also when this test does not send messages.
@QuarkusTest
@QuarkusTestResource(value = WireMockTelegram.class, restrictToAnnotatedClass = true)
class FallbackResourceTest {

  @ParameterizedTest
  @ValueSource(strings = {"/api", "/api/v1/unknown"})
  void unknownApiAddressIsNotFound(String path) {
    given().when().get(path).then().statusCode(Response.Status.NOT_FOUND.getStatusCode());
  }

  @ParameterizedTest
  @ValueSource(strings = {"/profile.jpeg", "/blog/old-post.html", "/chunk-ABC123.js"})
  void missingFileIsNotFound(String path) {
    given().when().get(path).then().statusCode(Response.Status.NOT_FOUND.getStatusCode());
  }

  @Test
  void appRouteGetsTheApp() {
    // The backend build copies the frontend build. Without it there is no page to return.
    Assumptions.assumeTrue(hasResource("index.csr.html") || hasResource("index.html"));

    given()
        .when()
        .get("/blog/moving-away-from-firebase-hosting")
        .then()
        .statusCode(Response.Status.OK.getStatusCode());
  }

  @Test
  void homeGetsTheApp() {
    // With prerendered pages, the root "index.html" is the prerendered home page.
    Assumptions.assumeTrue(hasResource("index.csr.html") || hasResource("index.html"));

    given()
        .when()
        .get("/")
        .then()
        .statusCode(Response.Status.OK.getStatusCode())
        .body(containsString("<app-root"));
  }

  @ParameterizedTest
  @ValueSource(strings = {"/plugins/capacitor-calendar", "/plugins/capacitor-calendar/"})
  void prerenderedRouteGetsItsOwnPage(String path) {
    Assumptions.assumeTrue(hasResource("plugins/capacitor-calendar/index.html"));

    given()
        .when()
        .get(path)
        .then()
        .statusCode(Response.Status.OK.getStatusCode())
        .body(containsString("<h1"));
  }

  @ParameterizedTest
  @ValueSource(strings = {"/de", "/nl/", "/de/blog/from-astro-to-angular", "/nl/projects"})
  void languageRouteGetsItsOwnPage(String path) {
    Assumptions.assumeTrue(hasResource("de/index.html"));

    given()
        .when()
        .get(path)
        .then()
        .statusCode(Response.Status.OK.getStatusCode())
        .body(containsString("<h1"));
  }

  @ParameterizedTest
  @ValueSource(strings = {"/unknown", "/de/unknown", "/nl/blog/unknown-post", "/blog/unknown-post"})
  void unknownPageIsNotFoundButShowsTheApp(String path) {
    // Only a build with prerendered pages knows every page.
    Assumptions.assumeTrue(hasResource("index.csr.html"));

    given()
        .when()
        .get(path)
        .then()
        .statusCode(Response.Status.NOT_FOUND.getStatusCode())
        .body(containsString("<app-root"));
  }

  @ParameterizedTest
  @ValueSource(strings = {"/", "/de", "/de/", "/nl/projects", "/plugins/capacitor-calendar/"})
  void pageIsCheckedAgainOnEveryVisit(String path) {
    // A cached page names build files that a later deploy removes, so it must not be reused
    // without asking. "/" and "/de/" must not come from the static file handler and its day cache.
    Assumptions.assumeTrue(hasResource("de/index.html"));

    given()
        .when()
        .get(path)
        .then()
        .statusCode(Response.Status.OK.getStatusCode())
        .header(HttpHeaders.CACHE_CONTROL, FallbackResource.PAGE_CACHE_CONTROL)
        .body(containsString("<app-root"));
  }

  @Test
  void unknownPageIsCheckedAgainOnEveryVisit() {
    Assumptions.assumeTrue(hasResource("index.csr.html"));

    given()
        .when()
        .get("/unknown")
        .then()
        .statusCode(Response.Status.NOT_FOUND.getStatusCode())
        .header(HttpHeaders.CACHE_CONTROL, FallbackResource.PAGE_CACHE_CONTROL);
  }

  @Test
  void accessDeniedGetsTheApp() {
    Assumptions.assumeTrue(hasResource("index.csr.html"));

    given().when().get("/access-denied").then().statusCode(Response.Status.OK.getStatusCode());
  }

  private static boolean hasResource(String name) {
    return Thread.currentThread().getContextClassLoader().getResource("META-INF/resources/" + name)
        != null;
  }
}
