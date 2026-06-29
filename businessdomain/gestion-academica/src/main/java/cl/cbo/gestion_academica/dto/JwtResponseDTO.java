package cl.cbo.gestion_academica.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDTO {
    private String token;
    private String type = "Bearer"; // Estándar de tokens de autorización
    private Long usuarioId;
    private String email;
    private String rol; // Ej: ROLE_PROFESOR, ROLE_ALUMNO
    private Long personaReferenciaId; // El ID del alumno o profesor dueño de la cuenta
}