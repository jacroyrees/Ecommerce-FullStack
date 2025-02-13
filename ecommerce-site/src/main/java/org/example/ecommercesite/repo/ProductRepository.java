package org.example.ecommercesite.repo;

import org.example.ecommercesite.model.Category;
import org.example.ecommercesite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.category.id = ?1")
    List<Product> findByCategoryId(Long categoryId);

    @Query(value = "SELECT * FROM product WHERE brand = ?1", nativeQuery = true)
    List<Product> findByBrand(String brand);

    @Query(value = "SELECT * FROM product WHERE price > ?1", nativeQuery = true)
    List<Product> findByPriceGreaterThan(BigDecimal price);

    List<Product> findByCategory(Category category);

    // Find products by category name
    List<Product> findByCategory_Name(String categoryName);
}
