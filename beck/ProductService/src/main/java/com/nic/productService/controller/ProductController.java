package com.nic.productService.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nic.productService.dto.ProductRequestDTO;
import com.nic.productService.dto.ProductResponseDTO;
import com.nic.productService.model.Product;
import com.nic.productService.repository.ProductRepository;

@RestController
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id)
    {
        System.out.println("Recebi DELETE no id: " + id);

        productRepository.deleteById(id);
        return ResponseEntity.ok("deleted successfully");
    }
}
