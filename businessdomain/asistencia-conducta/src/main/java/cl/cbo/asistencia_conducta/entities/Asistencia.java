package cl.cbo.asistencia_conducta.entities;

import cl.cbo.asistencia_conducta.shared.EstadoAsistencia;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "asistencias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING) // Guarda el texto ("PRESENTE", "AUSENTE") en lugar de números
    @Column(nullable = false, length = 20)
    private EstadoAsistencia estado;

    @Column(length = 255)
    private String observacion;

    // Referencias lógicas preparadas para MySQL (Claves foráneas manuales)
    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "asignatura_id")
    private Long asignaturaId;

    @Column(name = "profesor_id", nullable = false)
    private Long profesorId;
}