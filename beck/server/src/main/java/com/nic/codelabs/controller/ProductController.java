package com.nic.codelabs.controller;


import com.nic.codelabs.dto.ProductRequestDTO;
import com.nic.codelabs.dto.ProductResponseDTO;
import com.nic.codelabs.model.Product;
import com.nic.codelabs.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("product")
public class ProductController {

    @Autowired
    ProductRepository productRepository;
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts()
    {
        List<ProductResponseDTO> list = productRepository.findAll().stream().map(ProductResponseDTO::new).toList();
        return ResponseEntity.ok(list);
    }
    @PostMapping
    public ResponseEntity<Product> saveProduct(ProductRequestDTO productRequestDTO)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(new Product(productRequestDTO)));
    }
}
