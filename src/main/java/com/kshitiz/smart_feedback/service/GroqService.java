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

            String prompt =
                    "Generate a short restaurant review (15-20 words maximum) for a "
                            + rating
                            + " star rating. Return only the review text.";

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

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
                    """.formatted(prompt);

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