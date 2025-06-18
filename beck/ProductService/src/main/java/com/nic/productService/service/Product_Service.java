package com.nic.productService.service;

import com.nic.productService.dto.ProductDto;
import com.nic.productService.model.Product;
import com.nic.productService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Product_Service {

    @Autowired
    private ProductRepository repository;

    public void reduceStock(ProductDto data)
    {
        Optional<Product> productOpt = repository.findById(data.id());
        if(productOpt.isPresent())
        {
            Product product = productOpt.get();
            Long q = product.getQuantity();
            if(q - data.quantity()<=0)
            {
                repository.delete(product);
            }
            product.setQuantity(q-data.quantity());

            repository.save(product);
        }

    }
}
