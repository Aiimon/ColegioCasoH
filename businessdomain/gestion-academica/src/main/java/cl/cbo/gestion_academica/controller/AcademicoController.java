package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.entities.Evaluacion;
import cl.cbo.gestion_academica.services.AcademicoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/academico")
public class AcademicoController {

    private final AcademicoService academicoService;

    public AcademicoController(AcademicoService academicoService) {
        this.academicoService = academicoService;
    }

    @PostMapping("/alumnos")
    public ResponseEntity<Alumno> registrarAlumno(@RequestBody Alumno alumno) {
        Alumno nuevoAlumno = academicoService.matricularAlumno(alumno);
        return new ResponseEntity<>(nuevoAlumno, HttpStatus.CREATED);
    }

    @GetMapping("/alumnos/curso/{cursoId}")
    public ResponseEntity<List<Alumno>> listarAlumnosPorCurso(@PathVariable Long cursoId) {
        List<Alumno> alumnos = academicoService.obtenerAlumnosPorCurso(cursoId);
        return ResponseEntity.ok(alumnos);
    }

    @PostMapping("/evaluaciones")
    public ResponseEntity<Evaluacion> planificarEvaluacion(@RequestBody Evaluacion evaluacion) {
        Evaluacion nuevaEvaluacion = academicoService.crearEvaluacion(evaluacion);
        return new ResponseEntity<>(nuevaEvaluacion, HttpStatus.CREATED);
    }

    @PostMapping("/notas")
    public ResponseEntity<Nota> subirNota(@RequestBody Nota nota) {
        Nota notaGuardada = academicoService.ingresarNota(nota);
        return new ResponseEntity<>(notaGuardada, HttpStatus.CREATED);
    }

    @GetMapping("/notas/alumno/{alumnoId}")
    public ResponseEntity<List<Nota>> verNotasAlumno(@PathVariable Long alumnoId) {
        List<Nota> notas = academicoService.obtenerNotasAlumno(alumnoId);
        return ResponseEntity.ok(notas);
    }
}