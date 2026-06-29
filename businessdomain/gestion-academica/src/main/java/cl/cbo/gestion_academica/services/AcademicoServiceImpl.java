package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.entities.Evaluacion;
import cl.cbo.gestion_academica.repositories.AlumnoRepository;
import cl.cbo.gestion_academica.repositories.EvaluacionRepository;
import cl.cbo.gestion_academica.repositories.NotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AcademicoServiceImpl implements AcademicoService {

    private final AlumnoRepository alumnoRepository;
    private final EvaluacionRepository evaluacionRepository;
    private final NotaRepository notaRepository;

    public AcademicoServiceImpl(AlumnoRepository alumnoRepository,
                                EvaluacionRepository evaluacionRepository,
                                NotaRepository notaRepository) {
        this.alumnoRepository = alumnoRepository;
        this.evaluacionRepository = evaluacionRepository;
        this.notaRepository = notaRepository;
    }

    @Override
    @Transactional
    public Alumno matricularAlumno(Alumno alumno) {
        if (alumnoRepository.findByRut(alumno.getRut()).isPresent()) {
            throw new RuntimeException("El alumno con este RUT ya se encuentra matriculado.");
        }
        return alumnoRepository.save(alumno);
    }

    @Override
    public List<Alumno> obtenerAlumnosPorCurso(Long cursoId) {
        return alumnoRepository.findByCursoIdAndActivoTrue(cursoId);
    }

    @Override
    @Transactional
    public Evaluacion crearEvaluacion(Evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    @Override
    @Transactional
    public Nota ingresarNota(Nota nota) {
        if (nota.getValor() < 1.0 || nota.getValor() > 7.0) {
            throw new IllegalArgumentException("La nota debe ser un valor numérico entre 1.0 y 7.0");
        }
        return notaRepository.save(nota);
    }

    @Override
    public List<Nota> obtenerNotasAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }
}