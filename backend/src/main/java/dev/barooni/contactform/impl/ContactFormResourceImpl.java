package dev.barooni.contactform.impl;

import dev.barooni.contactform.ContactFormResource;
import dev.barooni.contactform.dto.ContactFormRequest;
import dev.barooni.telegram.TelegramNotifier;
import dev.barooni.telegram.dto.TelegramResponse;
import jakarta.inject.Inject;
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
    TelegramResponse telegramResponse = telegramNotifier.notify(message);
    processResponse(telegramResponse);

    return Response.accepted(telegramResponse).build();
  }

  private void processResponse(final TelegramResponse response) {
    if (response.ok()) {
      return;
    }

    String description = response.description();
    if (description == null) {
      description = "Unknown Telegram error";
    }

    throw new RuntimeException(description);
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
