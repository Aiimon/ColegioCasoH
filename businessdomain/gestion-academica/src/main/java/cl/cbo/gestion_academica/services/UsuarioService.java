package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Usuario;
import java.util.Optional;
import java.util.List;

public interface UsuarioService {
    // Métodos esenciales para la autenticación y gestión
    Optional<Usuario> buscarPorEmail(String email);
    Usuario registrarUsuario(Usuario usuario);
    List<Usuario> listarTodos();
    boolean existePorEmail(String email);
}