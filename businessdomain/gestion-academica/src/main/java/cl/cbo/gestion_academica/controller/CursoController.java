package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.entities.Curso;
import cl.cbo.gestion_academica.services.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping
    public ResponseEntity<Curso> crear(@RequestBody Curso curso) {
        return new ResponseEntity<>(cursoService.crearCurso(curso), HttpStatus.CREATED);
    }

    @GetMapping("/anio/{anio}")
    public ResponseEntity<List<Curso>> listarPorAnio(@PathVariable("anio") Integer anio) {
        return ResponseEntity.ok(cursoService.listarPorAnio(anio));
    }
}