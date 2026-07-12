package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.entity.Feedback;
import com.kshitiz.smart_feedback.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    // Save Customer Feedback
    @PostMapping
    public Feedback saveFeedback(@RequestBody Feedback feedback) {

        feedback.setCreatedAt(LocalDateTime.now());

        return service.saveFeedback(feedback);
    }

    // Get All Feedback
    @GetMapping
    public List<Feedback> getAllFeedback() {

        return service.getAllFeedback();
    }

    // Delete Feedback
    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {

        service.deleteFeedback(id);

        return "Feedback Deleted Successfully";
    }
    @GetMapping("/restaurant/{restaurantId}")
    public List<Feedback> getRestaurantFeedback(@PathVariable Long restaurantId) {
        return service.getRestaurantFeedback(restaurantId);
    }
}