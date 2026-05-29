package com.loanchecker.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loanchecker.entity.User;
import com.loanchecker.enums.Role;
import com.loanchecker.repository.UserRepository;
import com.loanchecker.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User requestUser) {
        if (userRepository.existsByEmail(requestUser.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User user = User.builder()
                .fullName(requestUser.getFullName())
                .email(requestUser.getEmail())
                .password(passwordEncoder.encode(requestUser.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        }
        
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}