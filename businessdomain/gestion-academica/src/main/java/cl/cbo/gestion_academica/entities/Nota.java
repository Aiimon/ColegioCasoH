package cl.cbo.gestion_academica.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "notas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Almacena notas con decimales (ej: 6.5)
    private Double valor;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "evaluacion_id", nullable = false)
    private Long evaluacionId;
}
