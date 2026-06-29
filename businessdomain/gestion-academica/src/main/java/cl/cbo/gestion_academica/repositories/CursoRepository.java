package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    // Para buscar cursos de un año específico (ej: todos los del 2026)
    List<Curso> findByAnioAcademico(Integer anioAcademico);
}