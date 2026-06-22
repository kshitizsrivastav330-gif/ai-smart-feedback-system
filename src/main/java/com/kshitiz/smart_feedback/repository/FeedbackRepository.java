package com.kshitiz.smart_feedback.repository;

import com.kshitiz.smart_feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {
}