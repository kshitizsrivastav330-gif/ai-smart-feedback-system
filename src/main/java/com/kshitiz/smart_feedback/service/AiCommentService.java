package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.entity.Feedback;
import com.kshitiz.smart_feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AiCommentService {

    private final GroqService groqService;
    private final FeedbackRepository feedbackRepository;

    public AiCommentService(GroqService groqService,
                            FeedbackRepository feedbackRepository) {
        this.groqService = groqService;
        this.feedbackRepository = feedbackRepository;
    }

    public List<String> generateComments(Integer rating) {

        String comment = groqService.generateComment(rating);

        Feedback feedback = new Feedback();

        feedback.setRestaurantId(1001L);
        feedback.setRating(rating);
        feedback.setComment(comment);
        feedback.setCreatedAt(LocalDateTime.now());

        feedbackRepository.save(feedback);

        return List.of(comment);
    }
}