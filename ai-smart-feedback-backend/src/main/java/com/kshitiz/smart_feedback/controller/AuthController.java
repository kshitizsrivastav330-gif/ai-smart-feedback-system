
package com.kshitiz.smart_feedback.controller;

import com.kshitiz.smart_feedback.dto.LoginRequest;
import com.kshitiz.smart_feedback.dto.RegisterRequest;
import com.kshitiz.smart_feedback.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kshitiz.smart_feedback.dto.LoginResponse;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return restaurantService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return restaurantService.login(request);
    }
}