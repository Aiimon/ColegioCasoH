package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Nota;
import java.util.List;

public interface NotaService {
    Nota ingresarNota(Nota nota);
    List<Nota> obtenerNotasPorAlumno(Long alumnoId);
    List<Nota> obtenerNotasPorEvaluacion(Long evaluacionId);
}