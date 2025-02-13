package org.example.ecommercesite.repo;

import org.example.ecommercesite.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    // Find orders by user ID
    @Query("SELECT o FROM Orders o WHERE o.id = ?1")
    List<Orders> findByUserId(String userId);

    // Custom SQL to find orders by status
    @Query(value = "SELECT * FROM orders WHERE status = ?1", nativeQuery = true)
    List<Orders> findByStatus(String status);

    // Custom SQL to find orders with total price greater than a specified value
    @Query(value = "SELECT * FROM orders WHERE total > ?1", nativeQuery = true)
    List<Orders> findByTotalGreaterThan(float total);
}
