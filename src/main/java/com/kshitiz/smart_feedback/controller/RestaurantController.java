package com.kshitiz.smart_feedback.controller;


import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.service.RestaurantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return service.save(restaurant);
    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return service.getAllRestaurants();
    }
}