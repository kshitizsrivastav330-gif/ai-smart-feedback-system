package com.kshitiz.smart_feedback.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiCommentService {

    public List<String> generateComments(Integer rating) {

        switch (rating) {

            case 1:
                return List.of(
                        "Service needs improvement",
                        "Food quality was disappointing",
                        "Long waiting time",
                        "Not satisfied with the experience",
                        "Expected better service"
                );

            case 2:
                return List.of(
                        "Food was average",
                        "Service could be faster",
                        "Needs some improvements",
                        "Not fully satisfied",
                        "Expected a better experience"
                );

            case 3:
                return List.of(
                        "Average experience",
                        "Food was okay",
                        "Service was decent",
                        "Good but can improve",
                        "Overall satisfactory"
                );

            case 4:
                return List.of(
                        "Very good food",
                        "Friendly staff",
                        "Nice ambience",
                        "Good experience overall",
                        "Would visit again"
                );

            case 5:
                return List.of(
                        "Amazing food and service",
                        "Outstanding dining experience",
                        "Highly recommended",
                        "Excellent ambience and staff",
                        "Loved every moment"
                );

            default:
                return List.of("Invalid Rating");
        }
    }
}