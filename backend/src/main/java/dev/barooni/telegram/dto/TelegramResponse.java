package dev.barooni.telegram.dto;

/**
 * Response returned from telegram /sendMessage.
 */
public record TelegramResponse(
    boolean ok,
    Integer error_code,
    String description,
    TelegramMessage result
) {}
