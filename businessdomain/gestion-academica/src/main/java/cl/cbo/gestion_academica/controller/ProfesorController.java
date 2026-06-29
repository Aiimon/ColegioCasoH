package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Usuario;
import cl.cbo.gestion_academica.services.ProfesorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(profesorService.obtenerPorId(id));
    }
}