package com.agri.agriinfluence.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_otps")
public class DeliveryOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private String phone;
    private String otp;
    private Boolean verified = false;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    public DeliveryOtp() {
    }

    public DeliveryOtp(Long id, Long orderId, String phone, String otp,
                       Boolean verified, LocalDateTime createdAt, LocalDateTime expiresAt) {
        this.id = id;
        this.orderId = orderId;
        this.phone = phone;
        this.otp = otp;
        this.verified = verified;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getPhone() {
        return phone;
    }

    public String getOtp() {
        return otp;
    }

    public Boolean getVerified() {
        return verified;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}