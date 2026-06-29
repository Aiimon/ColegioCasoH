package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Evaluacion;
import cl.cbo.gestion_academica.services.EvaluacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluaciones")
public class EvaluacionController {

    private final EvaluacionService evaluacionService;

    public EvaluacionController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    @PostMapping
    public ResponseEntity<Evaluacion> crear(@RequestBody Evaluacion evaluacion) {
        return new ResponseEntity<>(evaluacionService.planificarEvaluacion(evaluacion), HttpStatus.CREATED);
    }

    @GetMapping("/curso/{cursoId}/asignatura/{asignaturaId}")
    public ResponseEntity<List<Evaluacion>> listar(
            @PathVariable Long cursoId,
            @PathVariable Long asignaturaId) {

        return ResponseEntity.ok(
                evaluacionService.listarPorCursoYAsignatura(cursoId, asignaturaId)
        );
    }
}