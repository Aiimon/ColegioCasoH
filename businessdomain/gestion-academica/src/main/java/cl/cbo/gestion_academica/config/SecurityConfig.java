package cl.cbo.gestion_academica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Bean indispensable para encriptar claves y comparar contraseñas usando el algoritmo BCrypt de 60 caracteres
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Deshabilitamos CSRF porque trabajamos con tokens JWT de forma Stateless
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                // El endpoint de login es totalmente público para que el Frontend pueda solicitar un Token
                .requestMatchers("/api/auth/**").permitAll() 
                // Por ahora permitimos el resto de endpoints para poder testear todo el flujo de login con calma
                .anyRequest().permitAll() 
            );
        return http.build();
    }
}