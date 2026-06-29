package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.services.NotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public ResponseEntity<Nota> guardar(@RequestBody Nota nota) {
        return new ResponseEntity<>(notaService.ingresarNota(nota), HttpStatus.CREATED);
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Nota>> porAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(notaService.obtenerNotasPorAlumno(alumnoId));
    }

    @GetMapping("/evaluacion/{evaluacionId}")
    public ResponseEntity<List<Nota>> porEvaluacion(@PathVariable Long evaluacionId) {
        return ResponseEntity.ok(notaService.obtenerNotasPorEvaluacion(evaluacionId));
    }
}