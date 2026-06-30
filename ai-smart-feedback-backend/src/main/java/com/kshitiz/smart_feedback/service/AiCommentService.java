package com.kshitiz.smart_feedback.service;


import com.kshitiz.smart_feedback.dto.DashboardResponse;
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

    // Dashboard Statistics
    public DashboardResponse getDashboard(Long restaurantId) {

        DashboardResponse dashboard = new DashboardResponse();

        dashboard.setTotalReviews(
                feedbackRepository.countByRestaurantId(restaurantId));

        dashboard.setFiveStar(
                feedbackRepository.countByRestaurantIdAndRating(restaurantId, 5));

        dashboard.setFourStar(
                feedbackRepository.countByRestaurantIdAndRating(restaurantId, 4));

        dashboard.setThreeStar(
                feedbackRepository.countByRestaurantIdAndRating(restaurantId, 3));

        dashboard.setTwoStar(
                feedbackRepository.countByRestaurantIdAndRating(restaurantId, 2));

        dashboard.setOneStar(
                feedbackRepository.countByRestaurantIdAndRating(restaurantId, 1));

        return dashboard;
    }

    // All feedback for a restaurant
    public List<Feedback> getAllFeedback(Long restaurantId) {
        return feedbackRepository.findByRestaurantId(restaurantId);
    }

    // Feedback by rating
    public List<Feedback> getFeedbackByRating(Long restaurantId, Integer rating) {
        return feedbackRepository.findByRestaurantIdAndRating(restaurantId, rating);
    }
}