package com.nic.productService.dto;

import com.nic.productService.model.Product;

public record ProductRequestDTO(String name, String description, float price, Long quantity) {
    public ProductRequestDTO(Product product){
        this(product.getName(),product.getDescription(), product.getPrice(),product.getQuantity());
    }
}

