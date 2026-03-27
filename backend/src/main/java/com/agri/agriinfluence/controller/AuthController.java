package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.User;
import com.agri.agriinfluence.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            return badRequest("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            return badRequest("Password is required");
        }

        if (user.getName() == null || user.getName().trim().isEmpty()) {
            return badRequest("Name is required");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return badRequest("Email already registered");
        }

        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("USER");
        }

        String role = user.getRole().trim().toUpperCase();

        if (!role.equals("USER") && !role.equals("SHOPKEEPER") && !role.equals("ADMIN")) {
            return badRequest("Invalid role");
        }

        user.setRole(role);

        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public String test() {
        return "Auth API is working";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
            return badRequest("Email is required");
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            return badRequest("Password is required");
        }

        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (user == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return badRequest("Invalid password");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", "dummy-token");
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    private ResponseEntity<Map<String, String>> badRequest(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("message", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}