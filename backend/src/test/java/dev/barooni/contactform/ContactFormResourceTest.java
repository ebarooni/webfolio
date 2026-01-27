package dev.barooni.contactform;

import static dev.barooni.Constants.API;
import static dev.barooni.Constants.CONTACT_FORM;
import static dev.barooni.Constants.V1;
import static io.restassured.RestAssured.given;

import dev.barooni.telegram.WireMockTelegram;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.MethodOrderer.MethodName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

@QuarkusTest
@QuarkusTestResource(
    value = WireMockTelegram.class,
    restrictToAnnotatedClass = true
)
@TestMethodOrder(MethodName.class)
class ContactFormResourceTest {
  private static final String endpointContactForm = API + V1 + CONTACT_FORM;

  private static final String keyEmail = "email";
  private static final String keyMessage = "message";
  private static final String keyName = "name";

  private static final String invalidEmail01 = "a";

  private static final String invalidMessage01 = "";

  private static final String invalidName01 = "";

  private static final String validEmail01 = "a@b";
  private static final String validEmail02 = "first.last@email.com";

  private static final String validMessage01 = "A message.";

  private static final String validName01 = "Max Mustermann";

  @Test
  void test01_submitContactFormWithValidData() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, validEmail01)
        .add(keyName, validName01)
        .add(keyMessage, validMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.ACCEPTED.getStatusCode());
  }

  @Test
  void test02_submitContactFormWithValidData() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, validEmail02)
        .add(keyName, validName01)
        .add(keyMessage, validMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.ACCEPTED.getStatusCode());
  }

  @Test
  void test03_submitContactFormWithInvalidEmail() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, invalidEmail01)
        .add(keyName, validName01)
        .add(keyMessage, validMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.BAD_REQUEST.getStatusCode());
  }

  @Test
  void test04_submitContactFormWithEmptyName() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, validEmail02)
        .add(keyName, invalidName01)
        .add(keyMessage, validMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.BAD_REQUEST.getStatusCode());
  }

  @Test
  void test05_submitContactFormWithEmptyMessage() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, validEmail02)
        .add(keyName, validName01)
        .add(keyMessage, invalidMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.BAD_REQUEST.getStatusCode());
  }

  @Test
  void test06_submitContactFormWithInvalidData() {
    JsonObject body = Json.createObjectBuilder()
        .add(keyEmail, invalidEmail01)
        .add(keyName, invalidName01)
        .add(keyMessage, invalidMessage01)
        .build();

    given()
    .contentType(MediaType.APPLICATION_JSON)
    .body(body.toString())
    .when()
    .post(endpointContactForm)
    .then()
        .statusCode(Response.Status.BAD_REQUEST.getStatusCode());
  }
}