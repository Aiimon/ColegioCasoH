package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Apoderado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ApoderadoRepository extends JpaRepository<Apoderado, Long> {
    Optional<Apoderado> findByRut(String rut);
}