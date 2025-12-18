package com.zomaburger.repository;

import com.zomaburger.entity.Payment;
import com.zomaburger.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByOrderOrderByCreatedAtDesc(Order order);
    List<Payment> findByStatusOrderByCreatedAtAsc(Payment.PaymentStatus status);
    Optional<Payment> findByTransactionReference(String transactionReference);
}