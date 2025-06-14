package com.nic.authService.controller;

import com.nic.authService.dto.LoginResponseDTO;
import com.nic.authService.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.authService.dto.CredentialsDTO;
import com.nic.authService.model.User;
import com.nic.authService.repository.UserRepository;
import com.nic.authService.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user)
    {
        if(userRepository.findByEmail(user.getEmail()) != null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        return  ResponseEntity.status(HttpStatus.CREATED).body(authService.saveUser(user));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsDTO credentials)
    {   
        try{
            var usernamePassword = new UsernamePasswordAuthenticationToken(credentials.email(),credentials.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            User user = (User) auth.getPrincipal();
            var token = jwtService.generateToken(user);

            return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token,user.getRole().toString()));
        }catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    
    }


}
