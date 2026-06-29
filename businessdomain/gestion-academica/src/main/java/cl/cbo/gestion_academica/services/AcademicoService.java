package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.entities.Evaluacion;
import java.util.List;

public interface AcademicoService {
    Alumno matricularAlumno(Alumno alumno);
    List<Alumno> obtenerAlumnosPorCurso(Long cursoId);
    Evaluacion crearEvaluacion(Evaluacion evaluacion);
    Nota ingresarNota(Nota nota);
    List<Nota> obtenerNotasAlumno(Long alumnoId);
}