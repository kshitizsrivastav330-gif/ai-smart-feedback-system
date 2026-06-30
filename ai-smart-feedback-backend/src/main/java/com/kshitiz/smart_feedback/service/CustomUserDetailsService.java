package com.kshitiz.smart_feedback.service;

import com.kshitiz.smart_feedback.entity.Restaurant;
import com.kshitiz.smart_feedback.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Restaurant restaurant = restaurantRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Restaurant not found"));

        return new User(
                restaurant.getEmail(),
                restaurant.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_RESTAURANT"))
        );
    }
}