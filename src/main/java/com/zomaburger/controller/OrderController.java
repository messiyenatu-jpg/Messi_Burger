package com.zomaburger.controller;

import com.zomaburger.entity.Order;
import com.zomaburger.entity.Payment;
import com.zomaburger.repository.OrderRepository;
import com.zomaburger.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            // Create Order
            Order order = new Order();
            order.setPhone(orderRequest.getCustomerInfo().get("phone"));
            order.setDeliveryAddress(orderRequest.getCustomerInfo().get("address"));
            order.setTotalAmount(BigDecimal.valueOf(orderRequest.getTotalAmount()));
            order.setStatus(Order.OrderStatus.PENDING);
            order.setPaymentStatus(Order.PaymentStatus.PENDING);
            
            Order savedOrder = orderRepository.save(order);
            
            // Create Payment
            Payment payment = new Payment();
            payment.setOrder(savedOrder);
            payment.setAmount(BigDecimal.valueOf(orderRequest.getTotalAmount()));
            payment.setPaymentMethod(orderRequest.getPaymentMethod());
            payment.setTransactionReference(orderRequest.getTransactionReference());
            payment.setStatus(Payment.PaymentStatus.PENDING);
            
            paymentRepository.save(payment);
            
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody StatusUpdate statusUpdate) {
        return orderRepository.findById(id)
            .map(order -> {
                order.setStatus(Order.OrderStatus.valueOf(statusUpdate.getStatus()));
                Order updated = orderRepository.save(order);
                return ResponseEntity.ok(updated);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    static class OrderRequest {
        private List<Map<String, Object>> items;
        private Double totalAmount;
        private Map<String, String> customerInfo;
        private String paymentMethod;
        private String transactionReference;
        private String status;
        
        // Getters and setters
        public List<Map<String, Object>> getItems() { return items; }
        public void setItems(List<Map<String, Object>> items) { this.items = items; }
        public Double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
        public Map<String, String> getCustomerInfo() { return customerInfo; }
        public void setCustomerInfo(Map<String, String> customerInfo) { this.customerInfo = customerInfo; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
        public String getTransactionReference() { return transactionReference; }
        public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    static class StatusUpdate {
        private String status;
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
