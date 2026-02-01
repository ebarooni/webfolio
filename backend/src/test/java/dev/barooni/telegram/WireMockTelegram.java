package dev.barooni.telegram;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static dev.barooni.Constants.SEND_MESSAGE;

import com.github.tomakehurst.wiremock.WireMockServer;
import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import java.util.Map;

/**
 * Server for Telegram endpoints in tests.
 */
public class WireMockTelegram implements QuarkusTestResourceLifecycleManager {

  private WireMockServer wireMockServer;

  @Override
  public Map<String, String> start() {
    wireMockServer = new WireMockServer();
    wireMockServer.start();

    wireMockServer.stubFor(post(urlEqualTo(SEND_MESSAGE))
        .willReturn(aResponse()
            .withHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .withBody("""
                {
                  "ok": true,
                  "result": {
                    "message_id": 123456789,
                    "text": "Wiremock test text"
                  }
                }
                """)));

    return Map.of(
        "quarkus.rest-client.telegram-api.url", wireMockServer.baseUrl(),
        "telegram.chat.id", "fake-chat-id"
    );
  }

  @Override
  public void stop() {
    if (wireMockServer != null) {
      wireMockServer.stop();
      wireMockServer = null;
    }
  }
}
