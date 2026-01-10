package dev.barooni.contact.form.v1.resource.impl;

import dev.barooni.contact.form.v1.resource.ContactFormResource;
import jakarta.ws.rs.core.Response;


public class ContactFormResourceImpl implements ContactFormResource {

  @Override
  public Response submitContactForm() {
    return Response.ok().build();
  }
}
