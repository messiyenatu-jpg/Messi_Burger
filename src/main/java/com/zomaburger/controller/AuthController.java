package com.zomaburger.controller;

import com.zomaburger.model.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Mock authentication for development
        User user = new User("Test User", request.getEmail(), "", "");
        return ResponseEntity.ok(new LoginResponse("success", user));
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Mock registration for development
        return ResponseEntity.ok(new RegisterResponse("success", "User registered successfully"));
    }
    
    static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    static class LoginResponse {
        private String status;
        private User user;
        
        public LoginResponse(String status, User user) {
            this.status = status;
            this.user = user;
        }
        
        public String getStatus() { return status; }
        public User getUser() { return user; }
    }
    
    static class RegisterResponse {
        private String status;
        private String message;
        
        public RegisterResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }
        
        public String getStatus() { return status; }
        public String getMessage() { return message; }
    }
}