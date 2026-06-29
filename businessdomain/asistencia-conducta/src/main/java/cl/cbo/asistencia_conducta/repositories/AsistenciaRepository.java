package cl.cbo.asistencia_conducta.repositories;

import cl.cbo.asistencia_conducta.entities.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

//@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    
    // Busca la asistencia de un curso en una fecha específica (para pasar lista o revisarla)
    List<Asistencia> findByCursoIdAndFecha(Long cursoId, LocalDate fecha);
    
    // Busca todo el historial de asistencia de un alumno en particular
    List<Asistencia> findByAlumnoId(Long alumnoId);
}
