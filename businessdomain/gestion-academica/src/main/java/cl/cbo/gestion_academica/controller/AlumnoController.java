package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.services.AlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @PostMapping
    public ResponseEntity<Alumno> matricular(@RequestBody Alumno alumno) {
        return new ResponseEntity<>(alumnoService.matricular(alumno), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(alumnoService.obtenerPorId(id));
    }
    
    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<Alumno>> listarPorCurso(@PathVariable("cursoId") Long cursoId) {
        return ResponseEntity.ok(alumnoService.listarPorCurso(cursoId));
    }

    @PutMapping("/{id}/baja")
    public ResponseEntity<Void> darDeBaja(@PathVariable("id") Long id) {
        alumnoService.darDeBaja(id);
        return ResponseEntity.noContent().build();
    }
}