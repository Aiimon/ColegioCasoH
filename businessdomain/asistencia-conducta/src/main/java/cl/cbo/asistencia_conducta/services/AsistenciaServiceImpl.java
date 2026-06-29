package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.entities.Asistencia;
import cl.cbo.asistencia_conducta.repositories.AsistenciaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class AsistenciaServiceImpl implements AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaServiceImpl(AsistenciaRepository asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }

    @Override
    @Transactional
    public List<Asistencia> registrarLista(List<Asistencia> listaAsistencias) {
        return asistenciaRepository.saveAll(listaAsistencias);
    }

    @Override
    public List<Asistencia> obtenerAsistenciaPorCursoYFecha(Long cursoId, LocalDate fecha) {
        return asistenciaRepository.findByCursoIdAndFecha(cursoId, fecha);
    }

    @Override
    public List<Asistencia> obtenerHistorialAlumno(Long alumnoId) {
        return asistenciaRepository.findByAlumnoId(alumnoId);
    }
}