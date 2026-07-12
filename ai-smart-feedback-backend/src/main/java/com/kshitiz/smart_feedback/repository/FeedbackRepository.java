package com.kshitiz.smart_feedback.repository;

import com.kshitiz.smart_feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Get all feedback for a specific rating
    List<Feedback> findByRating(Integer rating);

    // Count feedback by rating
    long countByRating(Integer rating);

    // Count feedback by restaurant
    long countByRestaurantId(Long restaurantId);

    // Count feedback by restaurant and rating
    long countByRestaurantIdAndRating(Long restaurantId, Integer rating);

    // Get all feedback of a restaurant
    List<Feedback> findByRestaurantId(Long restaurantId);

    // Get feedback of a restaurant with a specific rating
    List<Feedback> findByRestaurantIdAndRating(Long restaurantId, Integer rating);

}