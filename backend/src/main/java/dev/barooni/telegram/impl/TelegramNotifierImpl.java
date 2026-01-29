package dev.barooni.telegram.impl;

import dev.barooni.telegram.TelegramBotClient;
import dev.barooni.telegram.TelegramNotifier;
import dev.barooni.telegram.dto.SendMessageRequest;
import dev.barooni.telegram.dto.TelegramResponse;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;

/**
 * Service to send message to telegram bot.
 */
@RequestScoped
public class TelegramNotifierImpl implements TelegramNotifier {

  @Inject
  @RestClient 
  TelegramBotClient client;

  @ConfigProperty(name = "telegram.chat.id")
  String chatId;
  
  @Override
  public TelegramResponse notify(final String message) {
    SendMessageRequest request = new SendMessageRequest(chatId, message);
    return client.sendMessage(request);
  }
}
