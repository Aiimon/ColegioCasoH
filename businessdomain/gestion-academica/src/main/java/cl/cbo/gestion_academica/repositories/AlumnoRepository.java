package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    
    Optional<Alumno> findByRut(String rut);
    List<Alumno> findByCursoIdAndActivoTrue(Long cursoId); 
}