package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.entity.Feedback;
import com.kshitiz.smart_feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    // Save Feedback
    public Feedback saveFeedback(Feedback feedback) {
        return repository.save(feedback);
    }

    // Get All Feedback
    public List<Feedback> getAllFeedback() {
        return repository.findAll();
    }

    // Get Feedback By Id
    public Feedback getFeedbackById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Delete Feedback
    public void deleteFeedback(Long id) {
        repository.deleteById(id);
    }
}