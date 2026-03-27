package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.WishListItem;
import com.agri.agriinfluence.repository.WishListItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishListItemRepository wishlistRepository;

    public WishlistController(WishListItemRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @GetMapping("/user/{userId}")
    public List<WishListItem> getWishlist(@PathVariable Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @PostMapping
    public WishListItem addToWishlist(@RequestBody WishListItem item) {
        Optional<WishListItem> existing =
                wishlistRepository.findByUserIdAndProductId(
                        item.getUserId(),
                        item.getProductId()
                );

        return existing.orElseGet(() -> wishlistRepository.save(item));
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    public String removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
        return "Removed from wishlist";
    }
}