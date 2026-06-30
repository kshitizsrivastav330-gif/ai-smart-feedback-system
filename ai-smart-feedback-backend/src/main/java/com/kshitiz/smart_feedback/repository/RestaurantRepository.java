package com.kshitiz.smart_feedback.repository;

import com.kshitiz.smart_feedback.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByEmail(String email);

    boolean existsByEmail(String email);
}