package dev.barooni.telegram;

import dev.barooni.telegram.dto.SendMessageRequest;
import dev.barooni.telegram.dto.TelegramResponse;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

/**
* Endpoints for interacting with the Telegram Bot API.
*/
@Path("/sendMessage")
@RegisterRestClient(configKey = "telegram-api")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(description = "Endpoints for interacting with the Telegram Bot API.", name = "Telegram")
public interface TelegramBotClient {
  
  @POST
  TelegramResponse sendMessage(
      @RequestBody(
          content = @Content(
              schema = @Schema(implementation = SendMessageRequest.class)
          ),
          description = "The chat ID and message.",
          required = true
      )
      @Valid
      SendMessageRequest request
  );
}
