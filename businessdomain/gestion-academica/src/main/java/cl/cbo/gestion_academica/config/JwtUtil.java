package cl.cbo.gestion_academica.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;

public class JwtUtil {

    // Clave secreta para firmar los tokens (En producción se maneja en variables de entorno)
    private static final String SECRET_KEY = "ColegioCbo_SecretKey_2026";
    // El token expirará en 4 horas
    private static final long EXPIRATION_TIME = 14_400_000; 

    public static String generateToken(String email, String rol) {
        return JWT.create()
                .withSubject(email)
                .withClaim("rol", rol)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }
}