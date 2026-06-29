package cl.cbo.asistencia_conducta.factory;

import cl.cbo.asistencia_conducta.entities.Anotacion;
import cl.cbo.asistencia_conducta.shared.TipoAnotacion;
import java.time.LocalDateTime;

public class AnotacionFactory {
    
    public static Anotacion crearAnotacion(String tipo) {
        if (tipo == null) {
            throw new IllegalArgumentException("El tipo de anotación no puede ser nulo.");
        }

        Anotacion anotacion = new Anotacion();
        anotacion.setFecha(LocalDateTime.now()); // Seteamos la hora actual del servidor automáticamente

        switch (tipo.toUpperCase()) {
            case "NEGATIVA" -> {
                anotacion.setTipo(TipoAnotacion.NEGATIVA);
                anotacion.setDetalle("[GRAVEDAD/ADVERTENCIA]: "); // Prefijo base
            }
            case "POSITIVA" -> {
                anotacion.setTipo(TipoAnotacion.POSITIVA);
                anotacion.setDetalle("[FELICITACIÓN]: "); // Prefijo base
            }
            case "INFORMATIVA" -> {
                anotacion.setTipo(TipoAnotacion.INFORMATIVA);
                anotacion.setDetalle("[BITÁCORA / AVISO]: "); // Prefijo base
            }
            default -> throw new IllegalArgumentException("Tipo de anotación no reconocido en la fábrica: " + tipo);
        }

        return anotacion;
    }
}