package com.nic.productService.dto;

import com.nic.productService.model.Product;

public record ProductResponseDTO(String id,String name, String description, Long quantity,float price) {
    public ProductResponseDTO(Product product)
    {
        this(product.getId(),product.getName(), product.getDescription(), product.getQuantity(), product.getPrice());
    }
}
