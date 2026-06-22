package com.kshitiz.smart_feedback.repository;




import com.kshitiz.smart_feedback.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository
        extends JpaRepository<Restaurant, Long> {
}