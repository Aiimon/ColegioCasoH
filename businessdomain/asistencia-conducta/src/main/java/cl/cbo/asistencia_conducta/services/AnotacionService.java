package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.entities.Anotacion;
import java.util.List;

public interface AnotacionService {
    Anotacion crearAnotacion(Anotacion anotacion);
    List<Anotacion> obtenerHojaDeVidaAlumno(Long alumnoId);
    void eliminarAnotacion(Long id);
}
