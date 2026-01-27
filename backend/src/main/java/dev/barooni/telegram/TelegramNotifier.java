package dev.barooni.telegram;

import jakarta.ws.rs.core.Response;

/**
 * Service to send message to telegram bot.
 */
public interface TelegramNotifier {

  Response notify(final String message);

}
