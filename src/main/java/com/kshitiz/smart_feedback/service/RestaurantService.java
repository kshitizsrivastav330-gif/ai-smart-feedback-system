package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    public Restaurant save(Restaurant restaurant) {
        return repository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return repository.findAll();
    }
}