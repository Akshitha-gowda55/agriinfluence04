package com.agri.agriinfluence.dto;

public class SendOtpRequest {

    private Long orderId;
    private Long shopkeeperId;

    public SendOtpRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getShopkeeperId() {
        return shopkeeperId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setShopkeeperId(Long shopkeeperId) {
        this.shopkeeperId = shopkeeperId;
    }
}