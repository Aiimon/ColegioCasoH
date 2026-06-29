package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.domain.Anotacion;
import cl.cbo.asistencia_conducta.domain.AnotacionNegativa;
import cl.cbo.asistencia_conducta.domain.AnotacionPositiva;
import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import cl.cbo.asistencia_conducta.services.ConductaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/conducta")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Tag(name = "Control Conductual - Bitácora", description = "Endpoints para la gestión del historial de comportamiento, faltas y méritos (Hoja de Vida)")
public class ConductaController {
    
    @Autowired
    private ConductaService conductaService;

    @GetMapping("/alumno/{rut}")
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
        List<RegistroConducta> anotaciones = new ArrayList<>();

        Anotacion factoryPositiva = new AnotacionPositiva();
        Anotacion factoryNegativa = new AnotacionNegativa();

        if ("12345678-9".equals(rut)) {
            String textoBase = "El estudiante es sorprendido jugando osu! en clases de Desarrollo Fullstack III.";
            String detalleProcesado = factoryNegativa.generarDetalle(textoBase); 
            
            RegistroConducta r1 = new RegistroConducta();
            r1.setId(1L);
            r1.setAlumnoRut(rut);
            r1.setTipo(factoryNegativa.getTipo()); 
            r1.setDetalle(detalleProcesado);
            anotaciones.add(r1);
            
        } else if ("98765432-1".equals(rut)) {
            String textoBase = "Demuestra un excelente desempeño liderando la estrategia de branching de su equipo en Git.";
            String detalleProcesado = factoryPositiva.generarDetalle(textoBase);
            
            RegistroConducta r2 = new RegistroConducta();
            r2.setId(2L);
            r2.setAlumnoRut(rut);
            r2.setTipo(factoryPositiva.getTipo());
            r2.setDetalle(detalleProcesado);
            anotaciones.add(r2);
        }

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
        return new ResponseEntity<>(conductaService.registrarAnotacion(rut, tipo, descripcion), HttpStatus.CREATED);
    }
}