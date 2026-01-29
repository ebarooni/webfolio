package dev.barooni.telegram;

import dev.barooni.telegram.dto.TelegramResponse;

/**
 * Service to send message to telegram bot.
 */
public interface TelegramNotifier {

  TelegramResponse notify(final String message);

}
