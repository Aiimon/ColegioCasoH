package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Curso;
import java.util.List;

public interface CursoService {
    Curso crearCurso(Curso curso);
    List<Curso> listarPorAnio(Integer anio);
    Curso obtenerPorId(Long id);
}