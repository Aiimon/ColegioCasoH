package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {
    // JpaRepository ya nos da el CRUD básico listo para las materias
}