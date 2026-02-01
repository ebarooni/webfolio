package dev.barooni.telegram.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
* DTO to send message request.
*/
@Schema(
    name = "SendMessageRequest",
    description = "DTO that represents the structure of send message request."
)
public class SendMessageRequest {
  
  @Schema(
      description = "Unique identifier of the target chat.",
      examples = { "123456789" },
      required = true
  )
  @NotBlank
  @JsonProperty("chat_id")
  public String chatId;

  @Schema(
      description = "Parsing mode for the message content. Always set to HTML.",
      examples = { "HTML" },
      defaultValue = "HTML"
  )
  @Pattern(regexp = "HTML", message = "parseMode must be HTML")
  @JsonProperty("parse_mode")
  public final String parseMode = "HTML";
  
  @Schema(
      description = "Text content of the message to be sent.",
      examples = { "Hello from Quarkus 👋" },
      required = true,
      minLength = 1,
      maxLength = 2048
  )
  @NotBlank
  @Size(min = 1, max = 2048)
  public String text;
  
  public SendMessageRequest(String chatId, String text) {
    this.chatId = chatId;
    this.text = text;
  }
}
