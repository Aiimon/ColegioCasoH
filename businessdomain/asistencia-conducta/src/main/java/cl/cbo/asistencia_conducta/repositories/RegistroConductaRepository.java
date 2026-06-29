package cl.cbo.asistencia_conducta.repositories;

import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RegistroConductaRepository extends JpaRepository<RegistroConducta, Long> {
    List<RegistroConducta> findByAlumnoRut(String alumnoRut);
}