package dev.barooni.contactform;

import dev.barooni.contactform.dto.ContactFormRequest;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

/**
 * Endpoints for receiving contact requests from the website.
 */
@Path("/v1/contact-form")
@Consumes(MediaType.APPLICATION_JSON)
@Tag(description = "Endpoints for receiving contact requests from the website.", name = "Contact")
public interface ContactFormResource {
  
  @POST
  @Operation(summary = "Submit a contact form")
  @APIResponses({
      @APIResponse(
        responseCode = "202",
        description = "Submission accepted."
      ),
      @APIResponse(
        responseCode = "400",
        description = "Validation failed or payload is malformed."
      ),
      @APIResponse(
        responseCode = "429",
        description = "Too many requests. Rate limit exceeded."
      ),
      @APIResponse(
        responseCode = "500",
        description = "Unexpected server error."
      )
  })
  Response submitContactForm(
      @RequestBody(
        content = @Content(
          mediaType = MediaType.APPLICATION_JSON, 
          schema = @Schema(implementation = ContactFormRequest.class)
        ),
        description = "The contact data and message.",
        required = true
      )
      @Valid
      ContactFormRequest request
  );
}
