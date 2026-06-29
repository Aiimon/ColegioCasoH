package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Asignatura;
import java.util.List;

public interface AsignaturaService {
    Asignatura crearAsignatura(Asignatura asignatura);
    List<Asignatura> listarTodas();
}