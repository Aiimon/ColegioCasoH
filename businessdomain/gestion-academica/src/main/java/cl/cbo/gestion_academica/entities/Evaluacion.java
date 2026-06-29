package cl.cbo.gestion_academica.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "evaluaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre; // Ej: "Solemne 1"

    @Column(nullable = false) // DOUBLE en MySQL para decimales
    private Double ponderacion;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(name = "asignatura_id", nullable = false)
    private Long asignaturaId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;
}
