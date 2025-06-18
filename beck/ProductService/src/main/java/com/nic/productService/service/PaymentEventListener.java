package com.nic.productService.service;

import com.nic.productService.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentEventListener {
    @Autowired
    private Product_Service productService;

    @KafkaListener(topics="payment-events", groupId = "product-service")
    public void consume(ProductDto productDto)
    {
        productService.reduceStock(productDto);
        System.out.println("------recebido evento da mensagem-----");
    }
}
