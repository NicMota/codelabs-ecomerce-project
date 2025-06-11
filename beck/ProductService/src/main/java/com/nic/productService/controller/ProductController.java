package com.nic.productService.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.productService.dto.ProductRequestDTO;
import com.nic.productService.dto.ProductResponseDTO;
import com.nic.productService.model.Product;
import com.nic.productService.repository.ProductRepository;

@RestController("product")
@RequestMapping("/product")
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
    public ResponseEntity<Product> saveProduct(@RequestBody ProductRequestDTO productRequestDTO)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(new Product(productRequestDTO)));
    }
}
