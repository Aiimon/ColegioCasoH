package cl.cbo.gestion_academica.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alumnos")
public class Alumno {
    
    @Id
    private String rut;
    private String nombre;
    private String apellido;
    private String curso;

    // Constructor Vacío Obligatorio para JPA
    public Alumno() {
    }

    // Constructor Completo
    public Alumno(String rut, String nombre, String apellido, String curso) {
        this.rut = rut;
        this.nombre = nombre;
        this.apellido = apellido;
        this.curso = curso;
    }

    // --- GETTERS Y SETTERS MANUALES (Encapsulamiento puro) ---
    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }
}