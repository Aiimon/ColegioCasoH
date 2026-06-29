package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.ApoderadoAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApoderadoAlumnoRepository extends JpaRepository<ApoderadoAlumno, Long> {
    // Para saber qué alumnos tiene a cargo un apoderado
    List<ApoderadoAlumno> findByApoderadoId(Long apoderadoId);
    
    // Para saber quiénes son los apoderados de un alumno
    List<ApoderadoAlumno> findByAlumnoId(Long alumnoId);
}