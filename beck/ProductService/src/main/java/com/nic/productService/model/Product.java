package com.nic.productService.model;

import com.nic.productService.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="products")
@Entity(name="products")
@EqualsAndHashCode(of="id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String description;

    private float price;

    private Long quantity;

    public Product(ProductRequestDTO productRequestDTO)
    {
        this.name = productRequestDTO.name();
        this.description = productRequestDTO.description();
        this.price = productRequestDTO.price();
        this.quantity = productRequestDTO.quantity();
    }
}
