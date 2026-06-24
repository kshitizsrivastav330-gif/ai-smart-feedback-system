package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.service.AiCommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class AiCommentController {

    private final AiCommentService service;

    public AiCommentController(AiCommentService service) {
        this.service = service;
    }

    @GetMapping("/generate")
    public List<String> generateComments(
            @RequestParam Integer rating) {

        return service.generateComments(rating);
    }
}