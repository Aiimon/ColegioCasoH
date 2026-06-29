package cl.cbo.asistencia_conducta.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// Conexión directa al microservicio académico por puerto o vía Eureka
@FeignClient(name = "gestion-academica", url = "http://localhost:8081", path = "/api")
public interface AlumnoClient {

    // Llama al endpoint de tu otro microservicio que devuelve los datos del alumno
    @GetMapping("/alumnos/{id}")
    Object obtenerAlumnoPorId(@PathVariable("id") Long id); 
}