package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.dto.DashboardResponse;
import com.kshitiz.smart_feedback.entity.Feedback;
import com.kshitiz.smart_feedback.service.AiCommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class AiCommentController {

    private final AiCommentService service;

    public AiCommentController(AiCommentService service) {
        this.service = service;
    }

    // Generate AI Review
    @GetMapping("/generate")
    public List<String> generateComments(@RequestParam Integer rating) {
        return service.generateComments(rating);
    }

    // Restaurant Dashboard
    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(
            @RequestParam(defaultValue = "1001") Long restaurantId) {

        return service.getDashboard(restaurantId);
    }

    // Get All Feedback
    @GetMapping("/all")
    public List<Feedback> getAllFeedback(
            @RequestParam(defaultValue = "1001") Long restaurantId) {

        return service.getAllFeedback(restaurantId);
    }

    // Get Feedback By Rating
    @GetMapping("/rating/{rating}")
    public List<Feedback> getFeedbackByRating(
            @PathVariable Integer rating,
            @RequestParam(defaultValue = "1001") Long restaurantId) {

        return service.getFeedbackByRating(restaurantId, rating);
    }
}