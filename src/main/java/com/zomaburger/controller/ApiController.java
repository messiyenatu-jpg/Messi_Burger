package com.zomaburger.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @GetMapping
    public Map<String, String> getApiInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Zoma Burger API is running");
        response.put("version", "1.0.0");
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Zoma Burger API");
        return response;
    }
}