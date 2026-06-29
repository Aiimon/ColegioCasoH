package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.clients.AlumnoClient;
import cl.cbo.asistencia_conducta.entities.Anotacion;
import cl.cbo.asistencia_conducta.repositories.AnotacionRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AnotacionServiceImpl implements AnotacionService {

    private final AnotacionRepository anotacionRepository;
    private final AlumnoClient alumnoClient; 

    public AnotacionServiceImpl(AnotacionRepository anotacionRepository, AlumnoClient alumnoClient) {
        this.anotacionRepository = anotacionRepository;
        this.alumnoClient = alumnoClient;
    }

    @Override
    public Anotacion crearAnotacion(Anotacion anotacion) {
        anotacion.setFecha(LocalDateTime.now());
        Anotacion guardada = anotacionRepository.save(anotacion);

        hidratarNombreAlumno(guardada);  
        return guardada;
    }

    @Override
    public List<Anotacion> obtenerHojaDeVidaAlumno(Long alumnoId) {
        List<Anotacion> anotaciones = anotacionRepository.findByAlumnoIdOrderByFechaDesc(alumnoId);

        anotaciones.forEach(this::hidratarNombreAlumno);
        
        return anotaciones;
    }

    @Override
    public void eliminarAnotacion(Long id) {
        anotacionRepository.deleteById(id);
    }

    /**
     * 🛠️ PUNTO 26: Método público con Circuit Breaker.
     * Si el microservicio 'gestion-academica' falla repetidamente, el circuito se ABRE 
     * y desvía las peticiones directo al método de fallback para no saturar los hilos del sistema.
     */
    @CircuitBreaker(name = "academicaCB", fallbackMethod = "fallbackHidratarNombre")
    public void hidratarNombreAlumno(Anotacion anotacion) {
        Map<String, Object> alumnoData = (Map<String, Object>) alumnoClient.obtenerAlumnoPorId(anotacion.getAlumnoId());
        
        if (alumnoData != null) {
            String nombre = (String) alumnoData.get("nombreCompleto");
            if (nombre == null && alumnoData.containsKey("nombres")) {
                nombre = alumnoData.get("nombres") + " " + alumnoData.get("apellidos");
            }
            anotacion.setNombreAlumno(nombre != null ? nombre : "Estudiante N/A");
        }
    }

    /**
     * 🚀 MÉTODO DE FALLBACK: Debe tener la misma firma del método original MÁS el parámetro Throwable.
     * Se ejecuta automáticamente cuando el microservicio remoto falla o cuando el circuito está ABIERTO.
     */
    public void fallbackHidratarNombre(Anotacion anotacion, Throwable t) {
        // Logueamos el error de forma interna sin romper la experiencia del cliente
        System.out.println("Circuit Breaker ACTIVADO. Motivo de falla: " + t.getMessage());
        
        // Plan de contingencia: Sincroniza o entrega un dato controlado seguro
        anotacion.setNombreAlumno("Estudiante (ID BD: " + anotacion.getAlumnoId() + ") [Modo Respaldo]");
    }
}