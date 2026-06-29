package cl.cbo.gestion_academica.entities;

import cl.cbo.gestion_academica.shared.TipoRol;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    // length = 60 es el tamaño estándar que requiere el algoritmo BCrypt para almacenar claves encriptadas
    @Column(nullable = false, length = 60) 
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoRol rol;

    @Column(nullable = false)
    private boolean activo = true;
    
    @Column(name = "persona_referencia_id")
    private Long personaReferenciaId;
}