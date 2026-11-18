package dev.barooni.telegram;

import dev.barooni.telegram.dto.TelegramResponse;

/** Service to send message to telegram bot. */
public interface TelegramNotifier {

  /**
   * Sends a message to the configured Telegram chat.
   *
   * @param message the message text, in Telegram HTML
   * @return the response of the Telegram Bot API
   */
  TelegramResponse notify(final String message);
}
