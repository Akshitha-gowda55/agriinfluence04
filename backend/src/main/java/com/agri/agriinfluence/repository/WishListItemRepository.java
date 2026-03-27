package com.agri.agriinfluence.repository;

import com.agri.agriinfluence.entity.WishListItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListItemRepository extends JpaRepository<WishListItem, Long> {

    List<WishListItem> findByUserId(Long userId);

    Optional<WishListItem> findByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    void deleteByUserIdAndProductId(Long userId, Long productId);
}