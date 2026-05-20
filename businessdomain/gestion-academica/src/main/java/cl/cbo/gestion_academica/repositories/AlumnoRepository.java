package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, String> {
    // Implementa el Repository Pattern heredando los métodos CRUD automáticamente
}