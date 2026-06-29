package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.entities.Asistencia;
import java.time.LocalDate;
import java.util.List;

public interface AsistenciaService {
    List<Asistencia> registrarLista(List<Asistencia> listaAsistencias);
    List<Asistencia> obtenerAsistenciaPorCursoYFecha(Long cursoId, LocalDate fecha);
    List<Asistencia> obtenerHistorialAlumno(Long alumnoId);
}
