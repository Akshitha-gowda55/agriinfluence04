package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.Order;
import com.agri.agriinfluence.entity.Product;
import com.agri.agriinfluence.repository.ProductRepository;
import com.agri.agriinfluence.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/orders", produces = MediaType.APPLICATION_JSON_VALUE)
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
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Product not found for productId: " + productId));
            }

            order.setShopkeeperId(product.getShopkeeperId());

            if (order.getStatus() == null || order.getStatus().trim().isEmpty()) {
                order.setStatus("PENDING");
            }

            Order savedOrder = orderService.saveOrder(order);
            return ResponseEntity.ok(savedOrder);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Failed to create order", "error", e.getMessage()));
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
            return ResponseEntity.status(404)
                    .body(Map.of("message", "Order not found"));
        }

        return ResponseEntity.ok(order.get());
    }

    @GetMapping("/track/{phone}")
    public ResponseEntity<?> trackOrdersByPhone(@PathVariable String phone) {
        List<Order> orders = orderService.getAllOrders()
                .stream()
                .filter(order -> order.getPhone() != null && order.getPhone().equals(phone))
                .toList();

        if (orders.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No orders found for this phone number"));
        }

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.getAllOrders()
                .stream()
                .filter(order -> order.getUserId() != null && order.getUserId().equals(userId))
                .toList();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getOrdersByStatus(@PathVariable String status) {
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
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Status is required"));
            }

            Order updatedOrder = orderService.updateOrderStatus(id, status.trim());
            return ResponseEntity.ok(updatedOrder);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Failed to update order status"));
        }
    }
}