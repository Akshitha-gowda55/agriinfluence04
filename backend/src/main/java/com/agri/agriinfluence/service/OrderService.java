package com.agri.agriinfluence.service;

import com.agri.agriinfluence.entity.Order;
import com.agri.agriinfluence.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private static final Set<String> ALLOWED_MANUAL_STATUSES = Set.of(
            "PENDING",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
    );

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("PENDING");
        }

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (status == null || status.trim().isEmpty()) {
            throw new RuntimeException("Status is required");
        }

        String newStatus = status.toUpperCase().trim();

        if (!ALLOWED_MANUAL_STATUSES.contains(newStatus)) {
            throw new RuntimeException("Invalid order status");
        }

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}