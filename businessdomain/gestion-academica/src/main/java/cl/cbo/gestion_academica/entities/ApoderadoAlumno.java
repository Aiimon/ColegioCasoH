package cl.cbo.gestion_academica.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "apoderado_alumno")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApoderadoAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apoderado_id", nullable = false)
    private Long apoderadoId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(length = 50)
    private String parentesco; // Ej: "PADRE", "MADRE", "TIO/A"
}