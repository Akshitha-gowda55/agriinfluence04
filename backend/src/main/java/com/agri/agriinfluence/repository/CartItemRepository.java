package com.agri.agriinfluence.repository;

import com.agri.agriinfluence.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    @Modifying
    void deleteByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    @Modifying
    void deleteByUserId(Long userId);
}