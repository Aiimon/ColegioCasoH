package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método vital para buscar credenciales en el Login
    Optional<Usuario> findByEmail(String email);
    
    // Para validar que no se registren correos duplicados
    boolean existsByEmail(String email);
}