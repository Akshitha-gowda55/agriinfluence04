package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.CartItem;
import com.agri.agriinfluence.repository.CartItemRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartItemRepository cartRepository;

    public CartController(CartItemRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping("/user/{userId}")
    public List<CartItem> getCartByUser(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        Optional<CartItem> existing = cartRepository.findByUserIdAndProductId(
                item.getUserId(),
                item.getProductId()
        );

        if (existing.isPresent()) {
            CartItem cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
            return cartRepository.save(cartItem);
        }

        return cartRepository.save(item);
    }

    @PutMapping("/user/{userId}/product/{productId}")
    public CartItem updateQuantity(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestBody CartItem updatedItem
    ) {
        Optional<CartItem> existing = cartRepository.findByUserIdAndProductId(userId, productId);

        if (existing.isPresent()) {
            CartItem cartItem = existing.get();
            cartItem.setQuantity(updatedItem.getQuantity());
            return cartRepository.save(cartItem);
        }

        return null;
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    @Transactional
    public void removeFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @DeleteMapping("/user/{userId}")
    @Transactional
    public void clearCart(@PathVariable Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}