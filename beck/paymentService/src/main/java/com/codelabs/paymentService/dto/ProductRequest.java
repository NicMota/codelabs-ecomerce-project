package com.codelabs.paymentService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String id;
    private Long amount;
    private Long quantity;
    private String name;
    private String currency;
    private String customerEmail;
    private String customerName;
}
