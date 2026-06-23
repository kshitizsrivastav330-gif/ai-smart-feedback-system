package com.kshitiz.smart_feedback.controller;


import com.kshitiz.smart_feedback.service.AiCommentService;
import com.kshitiz.smart_feedback.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class AiCommentController {

    private final AiCommentService service;
    private final GeminiService geminiService;

    public AiCommentController(AiCommentService service,
                               GeminiService geminiService) {
        this.service = service;
        this.geminiService = geminiService;
    }

    @GetMapping("/generate")
    public List<String> generateComments(
            @RequestParam Integer rating) {

        return service.generateComments(rating);
    }

    @GetMapping("/test-key")
    public String testKey() {
        return geminiService.getApiKey();
    }
}