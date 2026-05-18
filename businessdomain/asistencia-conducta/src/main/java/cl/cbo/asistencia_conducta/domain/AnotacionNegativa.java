package cl.cbo.asistencia_conducta.domain;

public class AnotacionNegativa implements Anotacion {
    @Override
    public String getTipo() { return "NEGATIVA"; }
    
    @Override
    public String generarDetalle(String descripcion) {
        return "[GRAVEDAD/ADVERTENCIA]: " + descripcion;
    }
}