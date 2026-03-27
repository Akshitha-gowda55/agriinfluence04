package com.agri.agriinfluence.dto;

public class VerifyOtpRequest {

    private Long orderId;
    private Long shopkeeperId;
    private String otp;

    public VerifyOtpRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getShopkeeperId() {
        return shopkeeperId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setShopkeeperId(Long shopkeeperId) {
        this.shopkeeperId = shopkeeperId;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}