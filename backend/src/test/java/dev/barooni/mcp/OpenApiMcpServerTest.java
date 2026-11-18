package dev.barooni.mcp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import dev.barooni.telegram.WireMockTelegram;
import io.quarkiverse.mcp.server.test.McpAssured;
import io.quarkiverse.mcp.server.test.McpAssured.McpStreamableTestClient;
import io.quarkiverse.mcp.server.test.McpAssured.ToolAnnotations;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@QuarkusTest
@QuarkusTestResource(value = WireMockTelegram.class, restrictToAnnotatedClass = true)
class OpenApiMcpServerTest {

  private static final String CONTACT_FORM_PATH = "/api/v1/contact-form";

  private McpStreamableTestClient client;

  @BeforeEach
  void connect() {
    client = McpAssured.newConnectedStreamableClient();
  }

  @AfterEach
  void disconnect() {
    client.disconnect();
  }

  @Test
  void toolsAreListedAsReadOnly() {
    client
        .when()
        .toolsList(page -> {
          assertEquals(2, page.size());
          for (final String name : new String[] {"searchEndpoint", "getEndpointDetails"}) {
            final ToolAnnotations annotations = page.findByName(name).annotations().orElseThrow();
            assertTrue(annotations.readOnlyHint(), name);
            assertFalse(annotations.destructiveHint(), name);
            assertTrue(annotations.idempotentHint(), name);
            assertFalse(annotations.openWorldHint(), name);
            assertFalse(annotations.title().isBlank(), name);
          }
        })
        .thenAssertResults();
  }

  @Test
  void searchEndpointFindsContactForm() {
    client
        .when()
        .toolsCall(
            "searchEndpoint",
            Map.of("keyword", "contact"),
            response -> {
              assertFalse(response.isError());
              assertTrue(response.firstContent().asText().text().contains(CONTACT_FORM_PATH));
            })
        .thenAssertResults();
  }

  @Test
  void searchEndpointRejectsBlankKeyword() {
    client
        .when()
        .toolsCall(
            "searchEndpoint", Map.of("keyword", " "), response -> assertTrue(response.isError()))
        .thenAssertResults();
  }

  @Test
  void getEndpointDetailsDescribesContactForm() {
    client
        .when()
        .toolsCall(
            "getEndpointDetails",
            Map.of("path", CONTACT_FORM_PATH),
            response -> {
              assertFalse(response.isError());
              final String text = response.firstContent().asText().text();
              assertTrue(text.contains("[POST]"), text);
              assertTrue(text.contains("Request body"), text);
              assertTrue(text.contains("429"), text);
            })
        .thenAssertResults();
  }

  @Test
  void getEndpointDetailsReportsUnknownPathAsToolError() {
    client
        .when()
        .toolsCall(
            "getEndpointDetails",
            Map.of("path", "/does-not-exist"),
            response -> assertTrue(response.isError()))
        .thenAssertResults();
  }

  @Test
  void openApiResourceIsReadable() {
    client
        .when()
        .resourcesRead(
            "webfolio://openapi",
            response ->
                assertTrue(
                    response.contents().getFirst().asText().text().contains(CONTACT_FORM_PATH)))
        .thenAssertResults();
  }
}
