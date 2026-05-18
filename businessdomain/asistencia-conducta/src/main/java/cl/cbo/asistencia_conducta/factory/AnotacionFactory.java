package cl.cbo.asistencia_conducta.factory;

import cl.cbo.asistencia_conducta.domain.Anotacion;
import cl.cbo.asistencia_conducta.domain.AnotacionNegativa;
import cl.cbo.asistencia_conducta.domain.AnotacionPositiva;

public class AnotacionFactory {
    public static Anotacion crearAnotacion(String tipo) {
        if (tipo == null) return null;
        switch (tipo.toUpperCase()) {
            case "POSITIVA": return new AnotacionPositiva();
            case "NEGATIVA": return new AnotacionNegativa();
            default: throw new IllegalArgumentException("Tipo de anotacion escolar no valido: " + tipo);
        }
    }
}