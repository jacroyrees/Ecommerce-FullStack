package org.example.ecommercesite.service;

import org.example.ecommercesite.model.PurchaseReport;
import org.example.ecommercesite.repo.PurchaseReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseReportService {

    @Autowired
    private PurchaseReportRepository purchaseReportRepository;

    // Get all purchase reports
    public List<PurchaseReport> getAllPurchaseReports() {
        return purchaseReportRepository.findAll();
    }

    // Get purchase report by ID
    public Optional<PurchaseReport> getPurchaseReportById(Long id) {
        return purchaseReportRepository.findById(id);
    }

    // Create a new purchase report
    public PurchaseReport createPurchaseReport(PurchaseReport purchaseReport) {
        // Ensure localDate is set to current date if not provided
        if (purchaseReport.getLocalDate() == null) {
            purchaseReport.setLocalDate(Date.from(Instant.now()));
        }
        return purchaseReportRepository.save(purchaseReport);
    }

    // Update purchase report
    public Optional<PurchaseReport> updatePurchaseReport(Long id, PurchaseReport purchaseReport) {
        if (purchaseReportRepository.existsById(id)) {
            purchaseReport.setId(id);
            // Ensure localDate is set to current date if not provided
            if (purchaseReport.getLocalDate() == null) {
                purchaseReport.setLocalDate(Date.from(Instant.now()));
            }
            return Optional.of(purchaseReportRepository.save(purchaseReport));
        }
        return Optional.empty();
    }

    // Delete purchase report
    public boolean deletePurchaseReport(Long id) {
        if (purchaseReportRepository.existsById(id)) {
            purchaseReportRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Create multiple purchase reports
    public List<PurchaseReport> createMultiplePurchaseReports(List<PurchaseReport> purchaseReports) {
        purchaseReports.forEach(report -> {
            // Ensure localDate is set to current date if not provided
            if (report.getLocalDate() == null) {
                report.setLocalDate(Date.from(Instant.now()));  // Set current date or a default date
            }
        });
        return purchaseReportRepository.saveAll(purchaseReports);
    }
}
