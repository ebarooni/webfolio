package dev.barooni.telegram.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
 * Response returned from telegram /sendMessage.
 */
@Schema(name = "TelegramResponse")
public record TelegramResponse(

    @Schema(required = true, description = "Whether the request succeeded.")
    boolean ok,

    @Schema(description = "Present when ok is false.")
    @JsonProperty("error_code")
    Integer errorCode,

    @Schema(description = "Human readable error description, present when ok is false.")
    String description,

    @Schema(description = "Present when ok is true.")
    TelegramMessage result
) {}
