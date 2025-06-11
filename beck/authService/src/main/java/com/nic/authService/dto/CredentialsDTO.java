package com.nic.authService.dto;

import com.nic.authService.model.User;

public record CredentialsDTO(String username, String password) {
    public CredentialsDTO(User user)
    {
        this(user.getUsername(),user.getPassword());
    }
}
