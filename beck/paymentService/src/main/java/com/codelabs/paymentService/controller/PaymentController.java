package com.codelabs.paymentService.controller;

import com.codelabs.paymentService.dto.PaymentResponse;
import com.codelabs.paymentService.dto.ProductRequest;
import com.codelabs.paymentService.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @PostMapping("/checkout")
    public ResponseEntity<PaymentResponse> checkoutProducts(@RequestBody ProductRequest request) throws StripeException {
        PaymentResponse response = paymentService.checkoutProducts(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
