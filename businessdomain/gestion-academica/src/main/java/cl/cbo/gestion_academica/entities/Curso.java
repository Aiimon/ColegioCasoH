package cl.cbo.gestion_academica.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cursos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50) // Ej: "1° Medio"
    private String nombre;

    @Column(nullable = false, length = 2) // Ej: "A" o "B"
    private String letra;

    @Column(name = "anio_academico", nullable = false) // INT en MySQL
    private Integer anioAcademico;

    @Column(name = "profesor_jefe_id")
    private Long profesorJefeId; 
}
