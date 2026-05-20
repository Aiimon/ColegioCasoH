package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.dto.AlumnoDTO;
import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.services.AlumnoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academica/alumnos")
@CrossOrigin(
    origins = "http://localhost:5173", 
    allowedHeaders = "*", 
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true"
)
@Tag(name = "Gestión Académica - Alumnos", description = "Endpoints para la consulta, registro y administración de matrículas de estudiantes del Colegio B. O'Higgins")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    @Operation(
        summary = "Obtener lista completa de alumnos", 
        description = "Recupera una lista con todos los alumnos matriculados en el sistema con sus datos académicos esenciales."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de estudiantes recuperada con éxito"),
        @ApiResponse(responseCode = "500", description = "Error interno al procesar la consulta en la base de datos")
    })
    public ResponseEntity<List<AlumnoDTO>> listarAlumnos() {
        return new ResponseEntity<>(alumnoService.obtenerTodos(), HttpStatus.OK);
    }

    @PostMapping
    @Operation(
        summary = "Registrar o matricular un nuevo alumno", 
        description = "Recibe los datos base de un estudiante y los persiste en el módulo académico. El RUN no debe estar duplicado."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Alumno registrado de manera exitosa en el sistema académico"),
        @ApiResponse(responseCode = "400", description = "Cuerpo de la petición inválido o campos obligatorios faltantes"),
        @ApiResponse(responseCode = "500", description = "Error en el servidor al intentar guardar el registro")
    })
    public ResponseEntity<AlumnoDTO> registrarAlumno(@RequestBody Alumno alumno) {
        return new ResponseEntity<>(alumnoService.guardar(alumno), HttpStatus.CREATED);
    }
}