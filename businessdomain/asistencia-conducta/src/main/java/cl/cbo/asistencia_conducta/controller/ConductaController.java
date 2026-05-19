package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.domain.Anotacion;
import cl.cbo.asistencia_conducta.domain.AnotacionNegativa;
import cl.cbo.asistencia_conducta.domain.AnotacionPositiva;
import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import cl.cbo.asistencia_conducta.services.ConductaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/conducta")
public class ConductaController {

    @Autowired
    private ConductaService conductaService;

    @GetMapping("/alumno/{rut}")
    public List<RegistroConducta> getHojaVida(@PathVariable String rut) {
        List<RegistroConducta> anotaciones = new ArrayList<>();

        // Ocupamos tus clases del patrón Factory para procesar el detalle de forma dinámica
        Anotacion factoryPositiva = new AnotacionPositiva();
        Anotacion factoryNegativa = new AnotacionNegativa();

        if ("12345678-9".equals(rut)) {
            // Alumno: Esteban Quito - Simulamos una anotación NEGATIVA procesada por la Factory
            String textoBase = "El estudiante es sorprendido jugando osu! en clases de Desarrollo Fullstack III.";
            String detalleProcesado = factoryNegativa.generarDetalle(textoBase); // Agrega el prefijo "[GRAVEDAD/ADVERTENCIA]:"
            
            RegistroConducta r1 = new RegistroConducta();
            r1.setId(1L);
            r1.setAlumnoRut(rut);
            r1.setTipo(factoryNegativa.getTipo()); // "NEGATIVA"
            r1.setDetalle(detalleProcesado);
            anotaciones.add(r1);
            
        } else if ("98765432-1".equals(rut)) {
            // Alumno: Alan Brito - Simulamos una anotación POSITIVA procesada por la Factory
            String textoBase = "Demuestra un excelente desempeño liderando la estrategia de branching de su equipo en Git.";
            String detalleProcesado = factoryPositiva.generarDetalle(textoBase); // Agrega el prefijo "[FELICITACIONES]:"
            
            RegistroConducta r2 = new RegistroConducta();
            r2.setId(2L);
            r2.setAlumnoRut(rut);
            r2.setTipo(factoryPositiva.getTipo()); // "POSITIVA"
            r2.setDetalle(detalleProcesado);
            anotaciones.add(r2);
        }

        return anotaciones;
    }

    @PostMapping("/alumno/{rut}")
    public ResponseEntity<RegistroConducta> crearAnotacion(
            @PathVariable String rut,
            @RequestParam String tipo,
            @RequestBody String descripcion) {
        return new ResponseEntity<>(conductaService.registrarAnotacion(rut, tipo, descripcion), HttpStatus.CREATED);
    }
}