package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.entity.Product;
import com.agri.agriinfluence.service.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(
            @RequestParam("name") String name,
            @RequestParam("slug") String slug,
            @RequestParam("category") String category,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("stock") int stock,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setSlug(slug);
        product.setCategory(category);
        product.setPrice(price);
        product.setDescription(description);
        product.setStock(stock);

        if (image != null && !image.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            product.setImageUrl("/uploads/" + fileName);
        }

        return productService.saveProduct(product);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("slug") String slug,
            @RequestParam("category") String category,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("stock") int stock,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Product existing = productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(name);
        existing.setSlug(slug);
        existing.setCategory(category);
        existing.setPrice(price);
        existing.setDescription(description);
        existing.setStock(stock);

        if (image != null && !image.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            existing.setImageUrl("/uploads/" + fileName);
        }

        return productService.saveProduct(existing);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}