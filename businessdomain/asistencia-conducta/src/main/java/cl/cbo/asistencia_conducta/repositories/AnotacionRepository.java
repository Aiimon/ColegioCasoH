package cl.cbo.asistencia_conducta.repositories;

import cl.cbo.asistencia_conducta.entities.Anotacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnotacionRepository extends JpaRepository<Anotacion, Long> {
    List<Anotacion> findByAlumnoIdOrderByFechaDesc(Long alumnoId);
}
