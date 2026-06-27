package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.entity.Feedback;
import com.kshitiz.smart_feedback.service.AiCommentService;
import com.kshitiz.smart_feedback.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final AiCommentService aiCommentService;

    public FeedbackController(
            FeedbackService feedbackService,
            AiCommentService aiCommentService) {

        this.feedbackService = feedbackService;
        this.aiCommentService = aiCommentService;
    }

    @PostMapping
    public Feedback saveFeedback(@RequestBody Feedback feedback) {

        feedback.setCreatedAt(LocalDateTime.now());

        // Generate AI Review
        String aiComment = aiCommentService
                .generateComments(feedback.getRating())
                .get(0);

        feedback.setComment(aiComment);

        return feedbackService.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {

        return feedbackService.getAllFeedback();

    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {

        feedbackService.deleteFeedback(id);

        return "Feedback Deleted Successfully";
    }

}