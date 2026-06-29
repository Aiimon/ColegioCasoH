package cl.cbo.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Permitimos explícitamente el origen de tu servidor de React con Vite
        corsConfig.addAllowedOrigin("http://localhost:5173");
        corsConfig.setMaxAge(3600L);
        
        // Permitimos todos los métodos (GET, POST, OPTIONS, etc.) y cabeceras
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        
        // Permitimos el envío de credenciales o cookies si el BFF las requiere más adelante
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}