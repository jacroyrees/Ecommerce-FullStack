package org.example.ecommercesite.repo;

import org.example.ecommercesite.model.PurchaseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PurchaseReportRepository extends JpaRepository<PurchaseReport, Long> {

    // Find purchase reports by category ID
    @Query("SELECT pr FROM PurchaseReport pr WHERE pr.category.id = ?1")
    List<PurchaseReport> findByCategoryId(Long categoryId);

    // Find purchase reports by product ID
    @Query("SELECT pr FROM PurchaseReport pr WHERE pr.product.id = ?1")
    List<PurchaseReport> findByProductId(Long productId);

    // Find by date range
    @Query(value = "SELECT * FROM purchase_report WHERE local_date BETWEEN ?1 AND ?2", nativeQuery = true)
    List<PurchaseReport> findByLocalDateBetween(Date startDate, Date endDate);

    // Find by category and product
    @Query("SELECT pr FROM PurchaseReport pr WHERE pr.category.id = ?1 AND pr.product.id = ?2")
    List<PurchaseReport> findByCategoryIdAndProductId(Long categoryId, Long productId);

    // Find by category, product, and date range
    @Query("SELECT pr FROM PurchaseReport pr WHERE pr.category.id = ?1 AND pr.product.id = ?2 AND pr.localDate BETWEEN ?3 AND ?4")
    List<PurchaseReport> findByCategoryIdAndProductIdAndLocalDateBetween(Long categoryId, Long productId, Date startDate, Date endDate);
}
