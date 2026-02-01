package dev.barooni.telegram.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
 * Message send via /sendMessage endpoint.
 */
public record TelegramMessage(
    @Schema(
        description = "The message that was initially sent.",
        examples = { "Hello from Quarkus 👋" }
    )
    String text
) {}
