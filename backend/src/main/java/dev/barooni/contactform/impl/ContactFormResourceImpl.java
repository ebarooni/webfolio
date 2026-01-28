package dev.barooni.contactform.impl;

import dev.barooni.contactform.ContactFormResource;
import dev.barooni.contactform.dto.ContactFormRequest;
import dev.barooni.telegram.TelegramNotifier;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.core.Response;

/**
 * The implementation class of ContactFormResource interface.
 */
public class ContactFormResourceImpl implements ContactFormResource {

  @Inject
  TelegramNotifier telegramNotifier;

  @Override
  public Response submitContactForm(ContactFormRequest request) {
    final String message = formatTelegramMessage(request);
    Response telegramResponse = telegramNotifier.notify(message);
    JsonObject telegramBody = processResponse(telegramResponse);

    return Response.accepted(telegramBody).build();
  }

  private JsonObject processResponse(final Response response) {
    response.bufferEntity();
    int status = response.getStatus();

    JsonObject json = null;
    try {
      json = response.readEntity(JsonObject.class);
    } catch (Exception ignored) {
      json = null;
    }

    if (json != null) {
      boolean ok = json.getBoolean("ok", false);

      if (!ok) {
        String description = json.getString("description", "Unknown Telegram error");
        throw new RuntimeException(description);
      }

      return json;
    }
    
    if (status < 200 || status >= 300) {
      throw new RuntimeException("Telegram API error without body");
    }

    return null;
  }

  private String formatTelegramMessage(ContactFormRequest request) {
    return """
      <b>📬 New Message</b>

      <b>Name:</b> %s
      <b>Email:</b> <a href="mailto:%s">%s</a>
      <b>Message:</b>
      %s
      """.formatted(
        escapeHtml(request.name),
        escapeHtml(request.email),
        escapeHtml(request.email),
        escapeHtml(request.message)
      );
  }

  private String escapeHtml(String value) {
    if (value == null) {
      return "";
    }

    return value
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;");
  }
}
