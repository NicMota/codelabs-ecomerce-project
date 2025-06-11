package com.nic.productService.dto;

import com.nic.productService.model.Product;

public record ProductResponseDTO(String name, String description, float price) {
    public ProductResponseDTO(Product product)
    {
        this(product.getName(), product.getDescription(), product.getPrice());
    }
}
