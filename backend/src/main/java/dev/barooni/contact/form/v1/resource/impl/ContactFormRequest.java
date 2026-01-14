package dev.barooni.contact.form.v1.resource.impl;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
 * DTO that represents the structure of contact form request.
 */
@Schema(
    name = "ContactFormRequest",
    description = "DTO that represents the structure of contact form request."
)
public class ContactFormRequest {
  
  @Email
  @NotBlank
  @Schema(
      description = "Email address for responding to the user.",
      examples = { "jane.doe@example.com" },
      format = "email",
      maxLength = 254,
      minLength = 3,
      required = true,
      type = SchemaType.STRING
  )
  @Size(max = 254)
  public String email;

  @NotBlank
  @Schema(
      description = "Name of the person submitting the form.",
      examples = { "Jane Doe" },
      maxLength = 100,
      minLength = 1,
      required = true,
      type = SchemaType.STRING
  )
  @Size(max = 100)
  public String name;

  @NotBlank
  @Schema(
      description = "Message text provided by the user.",
      examples = { "Hi, I would like to know more about your services." },
      maxLength = 1000,
      minLength = 1,
      required = true,
      type = SchemaType.STRING
  )
  @Size(max = 1000)
  public String message;
}
