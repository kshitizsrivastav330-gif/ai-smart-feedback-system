package com.kshitiz.smart_feedback.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiCommentService {

    private final GeminiService geminiService;

    public AiCommentService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public List<String> generateComments(Integer rating) {

        String comment = geminiService.generateComment(rating);

        return List.of(comment);
    }
}