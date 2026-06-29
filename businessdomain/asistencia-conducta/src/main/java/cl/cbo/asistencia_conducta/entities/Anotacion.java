package cl.cbo.asistencia_conducta.entities;

import cl.cbo.asistencia_conducta.shared.TipoAnotacion;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "anotaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Anotacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Mapea a DATETIME en MySQL (Guarda fecha y hora)
    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoAnotacion tipo;

    // columnDefinition = "TEXT" permite párrafos largos en MySQL sin el límite de 255 caracteres
    @Column(nullable = false, columnDefinition = "TEXT")
    private String detalle;

    // Referencias lógicas hacia Gestión Académica
    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Transient
    private String nombreAlumno;

    @Column(name = "profesor_id", nullable = false)
    private Long profesorId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;
}
