package com.agri.agriinfluence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long shopkeeperId;

    private String customerName;
    private String phone;
    private String address;
    private Double totalAmount;
    private String paymentId;
    private String status;

    public Order() {
    }

    public Order(Long id,
                 Long userId,
                 Long shopkeeperId,
                 String customerName,
                 String phone,
                 String address,
                 Double totalAmount,
                 String paymentId,
                 String status) {
        this.id = id;
        this.userId = userId;
        this.shopkeeperId = shopkeeperId;
        this.customerName = customerName;
        this.phone = phone;
        this.address = address;
        this.totalAmount = totalAmount;
        this.paymentId = paymentId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getShopkeeperId() {
        return shopkeeperId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setShopkeeperId(Long shopkeeperId) {
        this.shopkeeperId = shopkeeperId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}