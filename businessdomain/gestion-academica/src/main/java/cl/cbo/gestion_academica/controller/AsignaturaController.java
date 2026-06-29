package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Asignatura;
import cl.cbo.gestion_academica.services.AsignaturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaturas")
public class AsignaturaController {

    private final AsignaturaService asignaturaService;

    public AsignaturaController(AsignaturaService asignaturaService) {
        this.asignaturaService = asignaturaService;
    }

    @PostMapping
    public ResponseEntity<Asignatura> crear(@RequestBody Asignatura asignatura) {
        return new ResponseEntity<>(asignaturaService.crearAsignatura(asignatura), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Asignatura>> listar() {
        return ResponseEntity.ok(asignaturaService.listarTodas());
    }
}