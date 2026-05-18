package cl.cbo.asistencia_conducta.domain;

public interface Anotacion {
    String getTipo();
    String generarDetalle(String descripcion);
}