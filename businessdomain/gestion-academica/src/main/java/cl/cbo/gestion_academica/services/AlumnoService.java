package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Alumno;
import java.util.List;

public interface AlumnoService {
    Alumno matricular(Alumno alumno);
    Alumno obtenerPorId(Long id);
    List<Alumno> listarPorCurso(Long cursoId);
    void darDeBaja(Long id);
}