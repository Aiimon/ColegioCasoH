package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.domain.Anotacion;
import cl.cbo.asistencia_conducta.domain.AnotacionNegativa;
import cl.cbo.asistencia_conducta.domain.AnotacionPositiva;
import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import cl.cbo.asistencia_conducta.services.ConductaService;
<<<<<<< HEAD
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
=======
>>>>>>> feature/colegio-frontend
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/conducta")
<<<<<<< HEAD
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
// 🏷️ Agrupa y describe el módulo de bitácoras en la interfaz de Swagger
@Tag(name = "Control Conductual - Bitácora", description = "Endpoints para la gestión del historial de comportamiento, faltas y méritos (Hoja de Vida)")
public class ConductaController {
    
=======
public class ConductaController {

>>>>>>> feature/colegio-frontend
    @Autowired
    private ConductaService conductaService;

    @GetMapping("/alumno/{rut}")
<<<<<<< HEAD
    @Operation(
        summary = "Obtener hoja de vida por RUT del alumno", 
        description = "Recupera todas las anotaciones de comportamiento (méritos y deméritos) procesadas por el subdominio de conducta a través del Patrón Factory."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hoja de vida recuperada exitosamente con sus registros procesados"),
        @ApiResponse(responseCode = "404", description = "Estudiante no encontrado o sin historial conductual activo"),
        @ApiResponse(responseCode = "500", description = "Error interno al consultar la bitácora escolar")
    })
    public ResponseEntity<List<RegistroConducta>> getHojaVida(
        @Parameter(description = "RUT del estudiante (ej: 12345678-9)", example = "12345678-9") 
        @PathVariable("rut") String rut
    ) {
=======
    public List<RegistroConducta> getHojaVida(@PathVariable String rut) {
>>>>>>> feature/colegio-frontend
        List<RegistroConducta> anotaciones = new ArrayList<>();

        // Ocupamos tus clases del patrón Factory para procesar el detalle de forma dinámica
        Anotacion factoryPositiva = new AnotacionPositiva();
        Anotacion factoryNegativa = new AnotacionNegativa();

        if ("12345678-9".equals(rut)) {
<<<<<<< HEAD
            String textoBase = "El estudiante es sorprendido jugando osu! en clases de Desarrollo Fullstack III.";
            String detalleProcesado = factoryNegativa.generarDetalle(textoBase); 
=======
            // Alumno: Esteban Quito - Simulamos una anotación NEGATIVA procesada por la Factory
            String textoBase = "El estudiante es sorprendido jugando osu! en clases de Desarrollo Fullstack III.";
            String detalleProcesado = factoryNegativa.generarDetalle(textoBase); // Agrega el prefijo "[GRAVEDAD/ADVERTENCIA]:"
>>>>>>> feature/colegio-frontend
            
            RegistroConducta r1 = new RegistroConducta();
            r1.setId(1L);
            r1.setAlumnoRut(rut);
            r1.setTipo(factoryNegativa.getTipo()); // "NEGATIVA"
            r1.setDetalle(detalleProcesado);
            anotaciones.add(r1);
            
        } else if ("98765432-1".equals(rut)) {
            // Alumno: Alan Brito - Simulamos una anotación POSITIVA procesada por la Factory
            String textoBase = "Demuestra un excelente desempeño liderando la estrategia de branching de su equipo en Git.";
<<<<<<< HEAD
            String detalleProcesado = factoryPositiva.generarDetalle(textoBase);
=======
            String detalleProcesado = factoryPositiva.generarDetalle(textoBase); // Agrega el prefijo "[FELICITACIONES]:"
>>>>>>> feature/colegio-frontend
            
            RegistroConducta r2 = new RegistroConducta();
            r2.setId(2L);
            r2.setAlumnoRut(rut);
<<<<<<< HEAD
            r2.setTipo(factoryPositiva.getTipo());
=======
            r2.setTipo(factoryPositiva.getTipo()); // "POSITIVA"
>>>>>>> feature/colegio-frontend
            r2.setDetalle(detalleProcesado);
            anotaciones.add(r2);
        }

<<<<<<< HEAD
        return ResponseEntity.ok(anotaciones);
    }

    @PostMapping("/alumno/{rut}")
    @Operation(
        summary = "Emitir una nueva anotación conductual", 
        description = "Registra una incidencia en la bitácora del alumno, inyectando de manera dinámica el tipo mediante la lógica del servicio."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Registro de conducta creado y firmado con éxito por el docente"),
        @ApiResponse(responseCode = "400", description = "Parámetros inválidos o tipo de anotación no soportado por la factoría"),
        @ApiResponse(responseCode = "500", description = "Error al intentar registrar la anotación en la base de datos")
    })
    public ResponseEntity<RegistroConducta> crearAnotacion(
            @Parameter(description = "RUT del estudiante que recibe la sanción o mérito", example = "12345678-9")
            @PathVariable("rut") String rut,
            @Parameter(description = "Discriminador de la factoría: 'POSITIVA' o 'NEGATIVA'", example = "NEGATIVA")
            @RequestParam(value = "tipo", required = false, defaultValue = "NEGATIVA") String tipo,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Descripción detallada de los hechos observados por el docente")
            @RequestBody(required = false) String descripcion) {
=======
        return anotaciones;
    }

    @PostMapping("/alumno/{rut}")
    public ResponseEntity<RegistroConducta> crearAnotacion(
            @PathVariable String rut,
            @RequestParam String tipo,
            @RequestBody String descripcion) {
>>>>>>> feature/colegio-frontend
        return new ResponseEntity<>(conductaService.registrarAnotacion(rut, tipo, descripcion), HttpStatus.CREATED);
    }
}