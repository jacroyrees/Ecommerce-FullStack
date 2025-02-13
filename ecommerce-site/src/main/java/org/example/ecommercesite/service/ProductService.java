package org.example.ecommercesite.service;

import org.example.ecommercesite.model.Category;
import org.example.ecommercesite.model.Product;
import org.example.ecommercesite.repo.CategoryRepository;
import org.example.ecommercesite.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Product createProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getName() != null) {
            Optional<Category> optionalCategory = categoryRepository.findByName(product.getCategory().getName());
            if (optionalCategory.isEmpty()) {
                throw new ResourceNotFoundException("Category not found with name: " + product.getCategory().getName());
            }
            product.setCategory(optionalCategory.get());
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updatedProduct) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        if (updatedProduct.getCategory() != null && updatedProduct.getCategory().getName() != null) {
            Category category = categoryRepository.findByName(updatedProduct.getCategory().getName())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with name: " + updatedProduct.getCategory().getName()));
            existingProduct.setCategory(category);
        }

        if (updatedProduct.getTitle() != null) {
            existingProduct.setTitle(updatedProduct.getTitle());
        }
        if (updatedProduct.getDescription() != null) {
            existingProduct.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getImageUrl() != null) {
            existingProduct.setImageUrl(updatedProduct.getImageUrl());
        }
        if (updatedProduct.getPrice() != null) {
            existingProduct.setPrice(updatedProduct.getPrice());
        }
        if (updatedProduct.getStockQuantity() != null) {
            existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
        }
        if (updatedProduct.getBrand() != null) {
            existingProduct.setBrand(updatedProduct.getBrand());
        }

        return productRepository.save(existingProduct);
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
    }

    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        productRepository.deleteById(productId);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategory_Name(categoryName);
    }

    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}
