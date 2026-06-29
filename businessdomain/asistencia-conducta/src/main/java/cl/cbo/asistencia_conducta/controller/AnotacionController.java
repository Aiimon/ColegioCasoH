package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.factory.AnotacionFactory;
import cl.cbo.asistencia_conducta.entities.Anotacion;
import cl.cbo.asistencia_conducta.services.AnotacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conducta")
public class AnotacionController {

    private final AnotacionService anotacionService;

    public AnotacionController(AnotacionService anotacionService) {
        this.anotacionService = anotacionService;
    }

    //  POST - Modificado para recibir el DTO e implementar la Fábrica
    @PostMapping("/anotacion")
    public ResponseEntity<Anotacion> registrarAnotacion(@RequestBody AnotacionDTO dto) {
        
        // 1. La fábrica construye el objeto base pre-configurando la fecha, el Enum y el prefijo del detalle
        Anotacion anotacionBase = AnotacionFactory.crearAnotacion(dto.getTipo());
        
        // 2. Traspasamos las llaves lógicas del DTO al objeto de la entidad
        anotacionBase.setAlumnoId(dto.getAlumnoId());
        anotacionBase.setProfesorId(dto.getProfesorId());
        anotacionBase.setCursoId(dto.getCursoId());
        
        // 3. Concatenamos el desglose de los hechos al prefijo polimórfico institucional
        anotacionBase.setDetalle(anotacionBase.getDetalle() + dto.getDetalle());
        
        // 4. Delegamos al servicio existente la persistencia en la base de datos
        Anotacion nuevaAnotacion = anotacionService.crearAnotacion(anotacionBase);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaAnotacion);
    }

    // GET - Mantiene tu lógica intacta para renderizar el Libro de Vida en React
    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Anotacion>> verHojaDeVida(@PathVariable("alumnoId") Long alumnoId) {
        List<Anotacion> hojaDeVida = anotacionService.obtenerHojaDeVidaAlumno(alumnoId);
        return ResponseEntity.ok(hojaDeVida);
    }

    // DELETE - Mantiene tu lógica intacta
    @DeleteMapping("/anotacion/{id}")
    public ResponseEntity<Void> borrarAnotacion(@PathVariable("id") Long id) {
        anotacionService.eliminarAnotacion(id);
        return ResponseEntity.noContent().build();
    }
}

/**
 * Data Transfer Object (DTO) institucional.
 * Captura de forma segura los parámetros primitivos enviados desde el formulario de React.
 */
@lombok.Data
class AnotacionDTO {
    private String tipo;
    private String detalle;
    private Long alumnoId;
    private Long profesorId;
    private Long cursoId;
}