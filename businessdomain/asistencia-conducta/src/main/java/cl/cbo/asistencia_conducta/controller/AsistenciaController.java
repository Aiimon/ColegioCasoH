package cl.cbo.asistencia_conducta.controller;

import cl.cbo.asistencia_conducta.entities.Asistencia;
import cl.cbo.asistencia_conducta.services.AsistenciaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/asistencia")
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    public AsistenciaController(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    // POST
    @PostMapping("/guardar-lista")
    public ResponseEntity<List<Asistencia>> guardarLista(@RequestBody List<Asistencia> asistencias) {
        List<Asistencia> guardadas = asistenciaService.registrarLista(asistencias);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardadas);
    }

    // GET - Corregido: Se añaden "cursoId" y "fecha" explícitamente
    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<Asistencia>> verListaPorCurso(
            @PathVariable("cursoId") Long cursoId,
            @RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

        List<Asistencia> lista = asistenciaService.obtenerAsistenciaPorCursoYFecha(cursoId, fecha);
        return ResponseEntity.ok(lista);
    }

    // GET - Corregido: Se añade "alumnoId" explícitamente
    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Asistencia>> verHistorialAlumno(@PathVariable("alumnoId") Long alumnoId) {
        List<Asistencia> historial = asistenciaService.obtenerHistorialAlumno(alumnoId);
        return ResponseEntity.ok(historial);
    }
}