package cl.cbo.gestion_academica.clients;

import cl.cbo.gestion_academica.entities.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "auth-service", url = "http://localhost:8082", path = "/api/usuarios")
public interface UsuarioClient {

    @GetMapping("/{id}")
    Usuario obtenerUsuarioPorId(@PathVariable("id") Long id);
}