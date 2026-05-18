package cl.cbo.asistencia_conducta.domain;

public class AnotacionPositiva implements Anotacion {
    @Override
    public String getTipo() { return "POSITIVA"; }
    
    @Override
    public String generarDetalle(String descripcion) {
        return "[FELICITACIONES]: " + descripcion;
    }
}