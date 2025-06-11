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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String description;

    private float price;

    public Product(ProductRequestDTO productRequestDTO)
    {
        this.name = productRequestDTO.name();
        this.description = productRequestDTO.description();
        this.price = productRequestDTO.price();
    }
}
