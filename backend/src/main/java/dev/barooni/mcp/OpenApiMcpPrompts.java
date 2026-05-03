package dev.barooni.mcp;

import io.quarkiverse.mcp.server.Prompt;
import io.quarkiverse.mcp.server.PromptArg;
import io.quarkiverse.mcp.server.PromptMessage;
import java.util.List;

/**
* MCP prompts for exploring and working with the WebFolio API.
*/
public class OpenApiMcpPrompts {
  
  /**
  * Generates an onboarding prompt that gives a full overview of the WebFolio API.
  */
  @Prompt(
      name = "webfolio-api-onboarding",
      description = "Get a full overview of the WebFolio API — endpoints, purpose, and how to interact with it"
  )
  public List<PromptMessage> apiOnboarding() {
    return List.of(
      PromptMessage.withUserRole(
        """
        You are exploring the WebFolio API. Use the OpenAPI resource at webfolio://openapi \
        to understand all available endpoints, their purpose, request structure, and response codes.
        
        Please provide:
        1. A summary of what this API does and who it is for
        2. A list of all available endpoints with their HTTP method and purpose
        3. Any notable constraints, rate limits, or validation rules visible in the spec
        4. A short recommendation on how to get started integrating with this API
        """
      )
    );
  }
  
  /**
  * Generates a prompt for integrating the contact form endpoint into a frontend.
  *
  * @return a prompt guiding the LLM to explain contact form integration in detail
  */
  @Prompt(
      name = "webfolio-contact-form-integration",
      description = "Get a detailed integration guide for the WebFolio contact form endpoint"
  )
  public List<PromptMessage> contactFormIntegration() {
    return List.of(
      PromptMessage.withUserRole(
        """
        Using the WebFolio OpenAPI spec at webfolio://openapi, explain how a frontend developer \
        should integrate the contact form submission endpoint.
        
        Please cover:
        1. The endpoint path and HTTP method
        2. All required and optional fields with their types, constraints, and example values
        3. How to structure the request payload
        4. Every possible response status code and what it means for the user experience
        5. How to handle 400 validation errors, 429 rate limiting, and 500 server errors gracefully
        6. Any recommended client-side validation that mirrors the API constraints
        """
      )
    );
  }
  
  /**
  * Generates a prompt for debugging a failed contact form submission.
  */
  @Prompt(
      name = "webfolio-debug-contact-form",
      description = "Debug a failed contact form submission given an HTTP status code"
  )
  public List<PromptMessage> debugContactForm(
      @PromptArg(description = "The HTTP status code returned by the failed request, e.g. '400', '429', '500'") final String statusCode
  ) {
    return List.of(
      PromptMessage.withUserRole(
        """
        A contact form submission to the WebFolio API failed with HTTP status %s.
        
        Using the OpenAPI spec at webfolio://openapi:
        1. Explain what this status code means specifically for the contact form endpoint
        2. List the most likely causes for this failure
        3. Describe what the client should check or fix
        4. Provide an example of a corrected request if applicable
        """
        .formatted(statusCode)
      )
    );
  }
  
  /**
  * Generates a prompt for reviewing the overall WebFolio API design and health setup.
  */
  @Prompt(
      name = "webfolio-api-health-review",
      description = "Review the WebFolio API structure, health indicators, and identify gaps or improvements"
  )
  public List<PromptMessage> apiHealthReview() {
    return List.of(
      PromptMessage.withUserRole(
        """
        Review the WebFolio API using the OpenAPI spec at webfolio://openapi.
        
        Please evaluate:
        1. The overall API structure and whether it follows REST best practices
        2. Completeness — are there any obviously missing endpoints for a portfolio and blog backend?
        3. Consistency — are naming conventions, response structures, and status codes consistent?
        4. Robustness — are validation rules, error responses, and edge cases well covered in the spec?
        5. Suggestions for endpoints or improvements that would make this API more complete
        """
      )
    );
  }
}
