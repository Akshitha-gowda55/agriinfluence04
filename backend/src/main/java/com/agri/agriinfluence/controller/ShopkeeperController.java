package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.Order;
import com.agri.agriinfluence.entity.Product;
import com.agri.agriinfluence.repository.OrderRepository;
import com.agri.agriinfluence.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopkeeper")
@CrossOrigin(origins = "http://localhost:3000")
public class ShopkeeperController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public ShopkeeperController(ProductRepository productRepository,
                                OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/{shopkeeperId}/products")
    public ResponseEntity<List<Product>> getShopkeeperProducts(@PathVariable Long shopkeeperId) {
        return ResponseEntity.ok(productRepository.findByShopkeeperId(shopkeeperId));
    }

    @PostMapping("/{shopkeeperId}/products")
    public ResponseEntity<Product> addProduct(@PathVariable Long shopkeeperId,
                                              @RequestBody Product product) {
        product.setShopkeeperId(shopkeeperId);
        return ResponseEntity.ok(productRepository.save(product));
    }

    @PutMapping("/{shopkeeperId}/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long shopkeeperId,
                                           @PathVariable Long productId,
                                           @RequestBody Product updatedProduct) {
        Product existing = productRepository.findById(productId).orElse(null);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        if (!existing.getShopkeeperId().equals(shopkeeperId)) {
            return ResponseEntity.badRequest().body("You can edit only your own products");
        }

        existing.setName(updatedProduct.getName());
        existing.setSlug(updatedProduct.getSlug());
        existing.setCategory(updatedProduct.getCategory());
        existing.setPrice(updatedProduct.getPrice());
        existing.setDescription(updatedProduct.getDescription());
        existing.setImageUrl(updatedProduct.getImageUrl());
        existing.setStock(updatedProduct.getStock());

        return ResponseEntity.ok(productRepository.save(existing));
    }

    @DeleteMapping("/{shopkeeperId}/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long shopkeeperId,
                                           @PathVariable Long productId) {
        Product existing = productRepository.findById(productId).orElse(null);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        if (!existing.getShopkeeperId().equals(shopkeeperId)) {
            return ResponseEntity.badRequest().body("You can delete only your own products");
        }

        productRepository.delete(existing);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/{shopkeeperId}/orders")
    public ResponseEntity<List<Order>> getShopkeeperOrders(@PathVariable Long shopkeeperId) {
        return ResponseEntity.ok(orderRepository.findByShopkeeperId(shopkeeperId));
    }

    @PutMapping("/{shopkeeperId}/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long shopkeeperId,
                                               @PathVariable Long orderId,
                                               @RequestParam String status) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        if (!order.getShopkeeperId().equals(shopkeeperId)) {
            return ResponseEntity.badRequest().body("You can update only your own orders");
        }

        order.setStatus(status);
        orderRepository.save(order);

        return ResponseEntity.ok(order);
    }
}