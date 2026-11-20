package dev.barooni.fallback;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;

import dev.barooni.telegram.WireMockTelegram;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
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
    // With prerendered pages, the build has no root "index.html". The fallback returns the shell.
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

  private static boolean hasResource(String name) {
    return Thread.currentThread().getContextClassLoader().getResource("META-INF/resources/" + name)
        != null;
  }
}
