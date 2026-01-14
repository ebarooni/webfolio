package dev.barooni.contact.form.v1.resource.impl;

import dev.barooni.contact.form.v1.resource.ContactFormResource;
import jakarta.ws.rs.core.Response;

/**
 * The implementation class of ContactFormResource interface.
 */
public class ContactFormResourceImpl implements ContactFormResource {

  @Override
  public Response submitContactForm(ContactFormRequest request) {
    return Response.accepted().build();
  }
}
