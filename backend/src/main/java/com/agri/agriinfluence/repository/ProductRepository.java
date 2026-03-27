package com.agri.agriinfluence.repository;

import com.agri.agriinfluence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {


    List<Product> findByShopkeeperId(Long shopkeeperId);
}