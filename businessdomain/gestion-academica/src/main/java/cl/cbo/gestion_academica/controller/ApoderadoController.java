package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Apoderado;
import cl.cbo.gestion_academica.entities.ApoderadoAlumno;
import cl.cbo.gestion_academica.services.ApoderadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/apoderados")
public class ApoderadoController {

    private final ApoderadoService apoderadoService;

    public ApoderadoController(ApoderadoService apoderadoService) {
        this.apoderadoService = apoderadoService;
    }

    @PostMapping
    public ResponseEntity<Apoderado> registrar(@RequestBody Apoderado apoderado) {
        return new ResponseEntity<>(apoderadoService.registrar(apoderado), HttpStatus.CREATED);
    }

    // Vincula un alumno a un apoderado mediante QueryParams (ej: /api/apoderados/1/asignar-alumno?alumnoId=3&parentesco=MADRE)
    @PostMapping("/{apoderadoId}/asignar-alumno")
    public ResponseEntity<ApoderadoAlumno> asignarAlumno(
            @PathVariable Long apoderadoId,
            @RequestParam Long alumnoId,
            @RequestParam String parentesco) {
        return new ResponseEntity<>(apoderadoService.asignarEstudiante(apoderadoId, alumnoId, parentesco), HttpStatus.CREATED);
    }

    @GetMapping("/{apoderadoId}/alumnos")
    public ResponseEntity<List<ApoderadoAlumno>> listarMisAlumnos(@PathVariable Long apoderadoId) {
        return ResponseEntity.ok(apoderadoService.listarAlumnosAsignados(apoderadoId));
    }
}