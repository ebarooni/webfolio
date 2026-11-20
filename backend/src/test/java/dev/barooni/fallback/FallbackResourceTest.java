package dev.barooni.fallback;

import static io.restassured.RestAssured.given;

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
    Assumptions.assumeTrue(
        Thread.currentThread().getContextClassLoader().getResource("META-INF/resources/index.html")
            != null);

    given()
        .when()
        .get("/blog/moving-away-from-firebase-hosting")
        .then()
        .statusCode(Response.Status.OK.getStatusCode());
  }
}
