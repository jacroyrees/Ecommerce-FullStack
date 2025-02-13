package org.example.ecommercesite.controller;

import org.example.ecommercesite.model.PurchaseReport;
import org.example.ecommercesite.service.PurchaseReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase-reports")
public class PurchaseReportController {

    @Autowired
    private PurchaseReportService purchaseReportService;

    // Get all purchase reports
    @GetMapping
    public List<PurchaseReport> getAllPurchaseReports() {
        return purchaseReportService.getAllPurchaseReports();
    }

    // Get purchase report by ID
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseReport> getPurchaseReportById(@PathVariable Long id) {
        return purchaseReportService.getPurchaseReportById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new purchase report
    @PostMapping
    public ResponseEntity<PurchaseReport> createPurchaseReport(@RequestBody PurchaseReport purchaseReport) {
        PurchaseReport createdReport = purchaseReportService.createPurchaseReport(purchaseReport);
        return ResponseEntity.status(201).body(createdReport);
    }

    // Update a purchase report
    @PutMapping("/{id}")
    public ResponseEntity<PurchaseReport> updatePurchaseReport(@PathVariable Long id, @RequestBody PurchaseReport purchaseReport) {
        return purchaseReportService.updatePurchaseReport(id, purchaseReport)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a purchase report
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseReport(@PathVariable Long id) {
        if (purchaseReportService.deletePurchaseReport(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<PurchaseReport>> createMultiplePurchaseReports(@RequestBody List<PurchaseReport> purchaseReports) {
        List<PurchaseReport> createdReports = purchaseReportService.createMultiplePurchaseReports(purchaseReports);
        return ResponseEntity.status(201).body(createdReports);
    }
}
