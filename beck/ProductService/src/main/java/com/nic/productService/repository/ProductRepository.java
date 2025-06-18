package com.nic.productService.repository;

import com.nic.productService.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductRepository extends JpaRepository<Product,String> { }
