package com.codelabs.paymentService.service;

import com.codelabs.paymentService.dto.PaymentResponse;
import com.codelabs.paymentService.dto.ProductRequest;
import com.codelabs.paymentService.util.CustomerUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.net.StripeResponse;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Value("${stripe.secretKey}")
    private String secretKey;

    public PaymentResponse checkoutProducts(ProductRequest request) throws StripeException
    {
        Stripe.apiKey = secretKey;

        Customer customer = CustomerUtil.findOrCreateCustomer(request.getCustomerEmail(),request.getCustomerName());

        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
            .setName(request.getName()).build();
        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency(request.getCurrency()==null? "USD" : request.getCurrency())
                .setUnitAmount(request.getAmount())
                .setProductData(productData)
                .build();

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(request.getQuantity())
                .setPriceData(priceData)
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl("http://localhost:5173/payment/success")
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .putMetadata("productId",request.getId())
                .putMetadata("productQuantity",request.getQuantity().toString())
                .addLineItem(lineItem)
                .build();
        Session session = null;
        try{
            session = Session.create(params);
        }catch(Exception e)
        {
            System.out.println(e.getMessage());
        }
        return PaymentResponse.builder()
                .status("SUCCESS")
                .message("Payment Session created")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }

}
