package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Evaluacion;
import cl.cbo.gestion_academica.repositories.EvaluacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluacionServiceImpl implements EvaluacionService {

    private final EvaluacionRepository evaluacionRepository;

    public EvaluacionServiceImpl(EvaluacionRepository evaluacionRepository) {
        this.evaluacionRepository = evaluacionRepository;
    }

    @Override
    public Evaluacion planificarEvaluacion(Evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    @Override
    public List<Evaluacion> listarPorCursoYAsignatura(Long cursoId, Long asignaturaId) {
        return evaluacionRepository.findByCursoIdAndAsignaturaId(cursoId, asignaturaId);
    }
}