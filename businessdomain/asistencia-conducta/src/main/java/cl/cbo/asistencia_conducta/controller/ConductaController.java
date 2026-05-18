package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import cl.cbo.asistencia_conducta.services.ConductaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/conducta")
public class ConductaController {

    @Autowired
    private ConductaService conductaService;

    @GetMapping("/alumno/{rut}")
    public ResponseEntity<List<RegistroConducta>> listarPorAlumno(@PathVariable String rut) {
        return new ResponseEntity<>(conductaService.obtenerPorAlumno(rut), HttpStatus.OK);
    }

    @PostMapping("/alumno/{rut}")
    public ResponseEntity<RegistroConducta> crearAnotacion(
            @PathVariable String rut,
            @RequestParam String tipo,
            @RequestBody String descripcion) {
        return new ResponseEntity<>(conductaService.registrarAnotacion(rut, tipo, descripcion), HttpStatus.CREATED);
    }
}