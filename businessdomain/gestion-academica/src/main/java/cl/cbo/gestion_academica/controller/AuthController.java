package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.dto.LoginRequestDTO;
import cl.cbo.gestion_academica.dto.JwtResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite que React se conecte sin problemas de CORS
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        // Simulación temporal idéntica a tus datos de prueba en React
        if ("profesor@colegio.cl".equals(loginRequest.getEmail()) && "123456".equals(loginRequest.getPassword())) {
            
            JwtResponseDTO response = new JwtResponseDTO(
                "token-ficticio-jwt-123456",
                loginRequest.getEmail(),
                "Profesor O'Higgins",
                "ROLE_PROFESOR"
            );
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}