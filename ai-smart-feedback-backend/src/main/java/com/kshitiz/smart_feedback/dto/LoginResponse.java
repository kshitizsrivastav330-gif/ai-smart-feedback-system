package com.kshitiz.smart_feedback.dto;

public class LoginResponse {

    private String token;
    private Long restaurantId;
    private String restaurantName;

    public LoginResponse() {}

    public LoginResponse(String token, Long restaurantId, String restaurantName) {
        this.token = token;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}