package dev.barooni.telegram.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
 * Response returned from telegram /sendMessage.
 */
@Schema(name = "TelegramResponse")
public record TelegramResponse(

    @Schema(required = true, description = "Whether the request succeeded.")
    boolean ok,

    @Schema(description = "Present when ok is false.")
    Integer error_code,

    @Schema(description = "Human readable error description, present when ok is false.")
    String description,

    @Schema(description = "Present when ok is true.")
    TelegramMessage result
) {}
