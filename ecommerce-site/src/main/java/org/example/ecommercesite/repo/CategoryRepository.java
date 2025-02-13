package org.example.ecommercesite.repo;
import org.example.ecommercesite.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Find a category by name
    @Query("SELECT c FROM Category c WHERE c.name = ?1")
    Optional<Category> findByName(String name);

    // Custom SQL to find category by name
    @Query(value = "SELECT * FROM category WHERE name = ?1", nativeQuery = true)
    Optional<Category> findCategoryByName(String name);



}
