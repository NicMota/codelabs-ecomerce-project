package com.codelabs.api_gateway.config;


import com.codelabs.api_gateway.filter.AuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import java.util.List;


@Configuration
@RequiredArgsConstructor
@EnableHystrix
public class GatewayConfig {

    private final AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder)
    {


        return builder.routes()
                .route("product-service",r->r.path("/product/**")
                .and()
                .method(HttpMethod.POST)
                .or()
                .method(HttpMethod.DELETE)
                .filters(f->f.filter(filter))
                .uri("lb://product-service"))

                .route("product-service-open", r -> r.path("/product/**")
                .and()
                .method(HttpMethod.GET)
                .uri("lb://product-service"))

                .route("auth-service", r->r.path("/auth/**")
                .uri("lb://auth-service"))

                .route("payment-service", r->r.path("/payment/**")
                .uri("lb://payment-service"))
        .build();
    }
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173");
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }



}
