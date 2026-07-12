package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.dto.LoginRequest;
import com.kshitiz.smart_feedback.dto.LoginResponse;
import com.kshitiz.smart_feedback.dto.RegisterRequest;
import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

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

        String qrToken = UUID.randomUUID().toString();

        restaurant.setQrToken(qrToken);
        restaurant.setQrCodeUrl("http://localhost:5173/f/" + qrToken);
        restaurant.setCreatedAt(LocalDateTime.now());
        restaurant.setActive(true);

        restaurantRepository.save(restaurant);

        return "Restaurant Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

        Restaurant restaurant = restaurantRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), restaurant.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(restaurant.getEmail());

        return new LoginResponse(
                token,
                restaurant.getId(),
                restaurant.getName()
        );
    }
}