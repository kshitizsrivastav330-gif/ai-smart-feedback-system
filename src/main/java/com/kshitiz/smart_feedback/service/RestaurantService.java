package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.dto.LoginRequest;
import com.kshitiz.smart_feedback.dto.RegisterRequest;
import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request) {

        if (restaurantRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        Restaurant restaurant = new Restaurant();

        restaurant.setName(request.getName());
        restaurant.setEmail(request.getEmail());
        restaurant.setPassword(passwordEncoder.encode(request.getPassword()));
        restaurant.setLocation(request.getLocation());

        restaurantRepository.save(restaurant);

        return "Restaurant Registered Successfully";
    }

    public String login(LoginRequest request) {

        Restaurant restaurant = restaurantRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (restaurant == null) {
            return "Invalid Email";
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                restaurant.getPassword())) {

            return "Invalid Password";
        }

        return jwtService.generateToken(restaurant.getEmail());
    }
}