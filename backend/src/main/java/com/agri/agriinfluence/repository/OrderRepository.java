package com.agri.agriinfluence.repository;

import com.agri.agriinfluence.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByPhone(String phone);
    List<Order> findByStatus(String status);
    List<Order> findByUserId(Long userId);
    List<Order> findByShopkeeperId(Long shopkeeperId);
}