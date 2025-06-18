package com.codelabs.api_gateway.util;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;


@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;
    private Algorithm algorithm;

    public String validateToken(String token)
    {
        try{
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Error while validating token",exception);
        }
    }

    @PostConstruct
    public void init(){
        this.algorithm = Algorithm.HMAC256(secret);
    }


    public String getClaim(String token, String claimName) {
        try {
            DecodedJWT jwt = JWT.decode(token.replace("Bearer ", ""));
            return jwt.getClaim(claimName).asString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract claim", e);
        }
    }
    public boolean isInvalid(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token.replace("Bearer ", ""));
            return jwt.getExpiresAt().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
