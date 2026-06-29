package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.repositories.AlumnoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AlumnoServiceImpl implements AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoServiceImpl(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @Override
    @Transactional
    public Alumno matricular(Alumno alumno) {
        if (alumnoRepository.findByRut(alumno.getRut()).isPresent()) {
            throw new RuntimeException("El RUT ya está registrado.");
        }
        return alumnoRepository.save(alumno);
    }

    @Override
    public Alumno obtenerPorId(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado."));
    }

    @Override
    public List<Alumno> listarPorCurso(Long cursoId) {
        return alumnoRepository.findByCursoIdAndActivoTrue(cursoId);
    }

    @Override
    @Transactional
    public void darDeBaja(Long id) {
        Alumno alumno = obtenerPorId(id);
        alumno.setActivo(false);
        alumnoRepository.save(alumno);
    }
}