package com.zomaburger.dao;

import com.zomaburger.model.Order;
import com.zomaburger.util.DatabaseConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {
    
    public boolean createOrder(Order order) {
        String sql = "INSERT INTO orders (customer_name, customer_phone, delivery_address, total_amount, status, payment_status, order_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, order.getCustomerName());
            stmt.setString(2, order.getCustomerPhone());
            stmt.setString(3, order.getDeliveryAddress());
            stmt.setDouble(4, order.getTotalAmount());
            stmt.setString(5, order.getStatus().toString());
            stmt.setString(6, order.getPaymentStatus().toString());
            stmt.setTimestamp(7, Timestamp.valueOf(order.getOrderDate()));
            
            int result = stmt.executeUpdate();
            if (result > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    order.setId(rs.getLong(1));
                }
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders ORDER BY order_date DESC";
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                Order order = new Order();
                order.setId(rs.getLong("id"));
                order.setCustomerName(rs.getString("customer_name"));
                order.setCustomerPhone(rs.getString("customer_phone"));
                order.setDeliveryAddress(rs.getString("delivery_address"));
                order.setTotalAmount(rs.getDouble("total_amount"));
                order.setStatus(Order.OrderStatus.valueOf(rs.getString("status")));
                order.setPaymentStatus(Order.PaymentStatus.valueOf(rs.getString("payment_status")));
                order.setOrderDate(rs.getTimestamp("order_date").toLocalDateTime());
                orders.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }
}