package cl.cbo.gestion_academica.controller;

import cl.cbo.gestion_academica.dto.AlumnoDTO;
import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.services.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academica/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    public ResponseEntity<List<AlumnoDTO>> listarAlumnos() {
        return new ResponseEntity<>(alumnoService.obtenerTodos(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AlumnoDTO> registrarAlumno(@RequestBody Alumno alumno) {
        return new ResponseEntity<>(alumnoService.guardar(alumno), HttpStatus.CREATED);
    }
}