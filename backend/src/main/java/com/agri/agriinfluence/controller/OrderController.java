package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.Order;
import com.agri.agriinfluence.entity.Product;
import com.agri.agriinfluence.repository.ProductRepository;
import com.agri.agriinfluence.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final ProductRepository productRepository;

    public OrderController(OrderService orderService, ProductRepository productRepository) {
        this.orderService = orderService;
        this.productRepository = productRepository;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, @RequestParam Long productId) {
        try {
            Product product = productRepository.findById(productId).orElse(null);

            if (product == null) {
                return ResponseEntity.badRequest().body("Product not found");
            }

            order.setShopkeeperId(product.getShopkeeperId());

            if (order.getStatus() == null || order.getStatus().trim().isEmpty()) {
                order.setStatus("PENDING");
            }

            Order savedOrder = orderService.saveOrder(order);
            return ResponseEntity.ok(savedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create order");
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);

        if (order.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(order.get());
    }

    @GetMapping("/track/{phone}")
    public ResponseEntity<List<Order>> trackOrdersByPhone(@PathVariable String phone) {
        List<Order> orders = orderService.getAllOrders()
                .stream()
                .filter(order -> order.getPhone() != null && order.getPhone().equals(phone))
                .toList();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.getAllOrders()
                .stream()
                .filter(order -> order.getUserId() != null && order.getUserId().equals(userId))
                .toList();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        List<Order> orders = orderService.getAllOrders()
                .stream()
                .filter(order -> order.getStatus() != null && order.getStatus().equalsIgnoreCase(status))
                .toList();

        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");

            if (status == null || status.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Status is required");
            }

            Order updatedOrder = orderService.updateOrderStatus(id, status.trim());
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to update order status");
        }
    }
}