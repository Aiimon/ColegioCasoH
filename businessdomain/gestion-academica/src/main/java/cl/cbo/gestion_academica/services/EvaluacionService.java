package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Evaluacion;
import java.util.List;

public interface EvaluacionService {
    Evaluacion planificarEvaluacion(Evaluacion evaluacion);
    List<Evaluacion> listarPorCursoYAsignatura(Long cursoId, Long asignaturaId);
}