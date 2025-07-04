package com.codelabs.api_gateway.filter;

import com.codelabs.api_gateway.util.JwtUtil;
import com.codelabs.api_gateway.util.RouterValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RefreshScope
@Component
public class AuthenticationFilter implements GatewayFilter {


    private final RouterValidator routerValidator;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationFilter(RouterValidator routerValidator, JwtUtil jwtUtil) {
        this.routerValidator = routerValidator;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        if(routerValidator.isSecured.test(request)){
            if(this.isAuthMissing(request))
            {
                return this.onError(exchange, HttpStatus.UNAUTHORIZED);
            }
            final String token = this.getAuthHeader(request);
            if(jwtUtil.isInvalid(token) || !isAdm(token))
            {
                return this.onError(exchange,HttpStatus.FORBIDDEN);
            }

            this.updateRequest(exchange,token);
        }
        return chain.filter(exchange);
    }
    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }
    private boolean isAuthMissing(ServerHttpRequest request)
    {
        return !request.getHeaders().containsKey("Authorization");
    }
    private boolean isAdm(String token)
    {
        String role = jwtUtil.getClaim(token,"role");
        if(!role.equals("ADMIN"))
            return false;
        return true;
    }
    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0);
    }
    private void updateRequest(ServerWebExchange exchange, String token) {
        String email = jwtUtil.getClaim(token,"email");
        exchange.getRequest().mutate()
                .header("email", String.valueOf(email))
                .build();
    }
}
