package com.nic.authService.dto;

import com.nic.authService.model.User;

public record CredentialsDTO(String email, String password) {
    public CredentialsDTO(User user)
    {
        this(user.getEmail(),user.getPassword());
    }
}
