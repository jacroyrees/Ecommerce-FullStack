package org.example.ecommercesite.controller;

import org.example.ecommercesite.model.User;
import org.example.ecommercesite.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        User registeredUser = authService.register(user);
        if (registeredUser != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully.");
            response.put("userId", registeredUser.getId());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken."));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam String userName, @RequestParam String password) {
        User user = authService.login(userName, password);
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful.");
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid username or password."));
    }

    @PostMapping("/register-multiple")
    public ResponseEntity<Map<String, Object>> registerMultiple(@RequestBody List<User> users) {
        List<User> registeredUsers = authService.registerMultipleUsers(users);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Users registered successfully.");
        response.put("userCount", registeredUsers.size());
        return ResponseEntity.ok(response);
    }
}