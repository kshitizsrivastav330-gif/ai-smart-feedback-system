package com.kshitiz.smart_feedback.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GroqService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String apiKey;

    public GroqService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.objectMapper = new ObjectMapper();
    }

    public String generateComment(Integer rating) {

        try {
            String prompt = """
Generate one restaurant review for a %d star rating.

Rules:
- Use simple English.
- Maximum 15 words.
- Write like a real customer.
- Keep it short and natural.
- Mention food, service, staff, or atmosphere if suitable.
- Return only the review.
- Do not use quotation marks.
- Do not use emojis.

Example:
5 Stars: Amazing food and friendly staff. I will visit again.
4 Stars: Good food and quick service. Nice experience.
3 Stars: Food was good. Service was okay.
2 Stars: Food was average. Service was slow.
1 Star: Food was not good. I was disappointed.
""".formatted(rating);
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            String escapedPrompt = prompt
                    .replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n");

            String requestBody = """
{
  "model": "llama-3.1-8b-instant",
  "messages": [
    {
      "role": "user",
      "content": "%s"
    }
  ]
}
""".formatted(escapedPrompt);

            HttpEntity<String> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            "https://api.groq.com/openai/v1/chat/completions",
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JsonNode root = objectMapper.readTree(response.getBody());

            String review = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            return review.replace("\"", "").trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service is busy. Please try again.";
        }
    }
}