package com.nic.authService.dto;

import com.nic.authService.model.Role;

public record LoginResponseDTO(String token, String role) {
}
