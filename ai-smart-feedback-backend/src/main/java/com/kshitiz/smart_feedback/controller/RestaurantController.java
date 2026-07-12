package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.repository.RestaurantRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurant(@PathVariable Long id) {

        return restaurantRepository.findById(id).orElse(null);

    }
    @GetMapping("/qr/{qrToken}")
    public Restaurant getRestaurantByQr(@PathVariable String qrToken) {

        return restaurantRepository.findByQrToken(qrToken).orElse(null);

    }

}