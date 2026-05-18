package cl.cbo.asistencia_conducta.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "registros_conducta")
public class RegistroConducta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String alumnoRut;
    private String tipo;
    private String detalle;

    public RegistroConducta() {
    }

    public RegistroConducta(Long id, String alumnoRut, String tipo, String detalle) {
        this.id = id;
        this.alumnoRut = alumnoRut;
        this.tipo = tipo;
        this.detalle = detalle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlumnoRut() {
        return alumnoRut;
    }

    public void setAlumnoRut(String alumnoRut) {
        this.alumnoRut = alumnoRut;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
}