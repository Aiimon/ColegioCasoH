package cl.cbo.apigateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/academica")
    public ResponseEntity<List<Map<String, Object>>> fallbackAcademica() {
        Map<String, Object> response = Map.of(
            "id", 0,
            "status", "TEMPORARILY_UNAVAILABLE",
            "detalle", "El servicio de gestión académica no responde. El circuito se ha abierto para proteger la plataforma."
        );
        return ResponseEntity.ok(List.of(response));
    }

    @GetMapping("/conducta")
    public ResponseEntity<List<Map<String, Object>>> fallbackConducta() {
        Map<String, Object> response = Map.of(
            "id", 0,
            "status", "TEMPORARILY_UNAVAILABLE",
            "detalle", "El módulo de anotaciones y bitácoras está experimentando problemas. Modo de contingencia activo."
        );
        return ResponseEntity.ok(List.of(response));
    }
}