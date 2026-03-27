package com.agri.agriinfluence.repository;

import com.agri.agriinfluence.entity.DeliveryOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryOtpRepository extends JpaRepository<DeliveryOtp, Long> {
    Optional<DeliveryOtp> findTopByOrderIdOrderByCreatedAtDesc(Long orderId);
}