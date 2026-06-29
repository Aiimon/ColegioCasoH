package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.config.JwtUtil;
import cl.cbo.gestion_academica.entities.Usuario;
import cl.cbo.gestion_academica.repositories.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String email, String password) {
        // 1. Buscar usuario en la BD
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas o usuario no existe."));

        // 2. Verificar si está activo
        if (!usuario.isActivo()) {
            throw new RuntimeException("El usuario se encuentra deshabilitado.");
        }

        // 3. Validar contraseña encriptada con BCrypt
        // NOTA: Para las pruebas en phpMyAdmin, la clave en la BD debe estar encriptada en BCrypt, no en texto plano.
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas.");
        }

        // 4. Si todo está OK, generamos y retornamos su Token JWT
        return JwtUtil.generateToken(usuario.getEmail(), usuario.getRol().name());
    }
}