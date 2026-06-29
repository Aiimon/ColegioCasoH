package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Apoderado;
import cl.cbo.gestion_academica.entities.ApoderadoAlumno;
import java.util.List;

public interface ApoderadoService {
    Apoderado registrar(Apoderado apoderado);
    ApoderadoAlumno asignarEstudiante(Long apoderadoId, Long alumnoId, String parentesco);
    List<ApoderadoAlumno> listarAlumnosAsignados(Long apoderadoId);
}