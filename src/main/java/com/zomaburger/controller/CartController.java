package com.zomaburger.controller;

import com.zomaburger.model.MenuItem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    

    
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Item added to cart");
        response.put("quantity", request.getQuantity());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/items")
    public ResponseEntity<?> getCartItems() {
        // Return empty cart for now - implement session-based cart later
        return ResponseEntity.ok(Map.of("items", new Object[0], "total", 0));
    }
    
    static class CartRequest {
        private int menuItemId;
        private int quantity;
        
        public int getMenuItemId() { return menuItemId; }
        public void setMenuItemId(int menuItemId) { this.menuItemId = menuItemId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}