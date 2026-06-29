package cl.cbo.gestion_academica.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "alumnos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT en MySQL
    private Long id;

    @Column(nullable = false, unique = true, length = 12) // VARCHAR(12) para RUT Chileno
    private String rut;

    @Column(nullable = false, length = 100) // VARCHAR(100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "fecha_nacimiento", nullable = false) // Mapea a DATE en MySQL
    private LocalDate fechaNacimiento;

    @Column(nullable = false)
    private boolean activo = true;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;
}