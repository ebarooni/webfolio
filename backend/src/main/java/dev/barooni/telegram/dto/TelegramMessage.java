package dev.barooni.telegram.dto;

/**
 * Message send via /sendMessage endpoint.
 */
public record TelegramMessage(
    String text
) {}
