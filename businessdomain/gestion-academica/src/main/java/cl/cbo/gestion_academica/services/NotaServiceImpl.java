package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.repositories.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;

    public NotaServiceImpl(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @Override
    public Nota ingresarNota(Nota nota) {
        if (nota.getValor() < 1.0 || nota.getValor() > 7.0) {
            throw new IllegalArgumentException("La nota debe estar en el rango de 1.0 a 7.0");
        }

        return notaRepository.save(nota);
    }

    @Override
    public List<Nota> obtenerNotasPorAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }

    @Override
    public List<Nota> obtenerNotasPorEvaluacion(Long evaluacionId) {
        return notaRepository.findByEvaluacionId(evaluacionId);
    }
}