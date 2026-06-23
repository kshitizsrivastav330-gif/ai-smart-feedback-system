package com.kshitiz.smart_feedback.service;

import com.google.genai.Client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {


    @Value("${gemini.api.key}")
    private String apiKey;

    public String generateComment(Integer rating) {

        try {

            Client client = Client.builder()
                    .apiKey(apiKey)
                    .build();

            String prompt =
                    "Generate a short restaurant review (15-20 words maximum) for a "
                            + rating +
                            " star rating. Return only the review text.";

            String response = client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null
            ).text();

            return response;

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    public String getApiKey() {
        return apiKey;
    }


}
