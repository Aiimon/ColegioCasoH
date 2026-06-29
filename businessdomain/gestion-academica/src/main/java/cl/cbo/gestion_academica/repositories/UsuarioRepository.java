package cl.cbo.gestion_academica.repositories;

import cl.cbo.gestion_academica.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);

    // 🚀 QUERY NATIVA: Trae solo el email de la tabla saltándose los Enums problemáticos
    @Query(value = "SELECT email FROM usuarios WHERE id = :id", nativeQuery = true)
    Optional<String> findEmailByIdNativo(@Param("id") Long id);
}