package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface EvaluacionRepository extends JpaRepository<Evaluacion, Long> {
    List<Evaluacion> findByCursoIdAndAsignaturaId(Long cursoId, Long asignaturaId);
}