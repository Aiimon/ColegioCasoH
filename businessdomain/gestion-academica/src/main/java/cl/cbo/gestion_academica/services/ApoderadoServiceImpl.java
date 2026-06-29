package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Apoderado;
import cl.cbo.gestion_academica.entities.ApoderadoAlumno;
import cl.cbo.gestion_academica.repositories.ApoderadoAlumnoRepository;
import cl.cbo.gestion_academica.repositories.ApoderadoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ApoderadoServiceImpl implements ApoderadoService {

    private final ApoderadoRepository apoderadoRepository;
    private final ApoderadoAlumnoRepository apoderadoAlumnoRepository;

    public ApoderadoServiceImpl(ApoderadoRepository apoderadoRepository,
                                ApoderadoAlumnoRepository apoderadoAlumnoRepository) {
        this.apoderadoRepository = apoderadoRepository;
        this.apoderadoAlumnoRepository = apoderadoAlumnoRepository;
    }

    @Override
    @Transactional
    public Apoderado registrar(Apoderado apoderado) {
        if (apoderadoRepository.findByRut(apoderado.getRut()).isPresent()) {
            throw new RuntimeException("El apoderado con este RUT ya existe.");
        }
        return apoderadoRepository.save(apoderado);
    }

    @Override
    @Transactional
    public ApoderadoAlumno asignarEstudiante(Long apoderadoId, Long alumnoId, String parentesco) {
        ApoderadoAlumno relacion = new ApoderadoAlumno();
        relacion.setApoderadoId(apoderadoId);
        relacion.setAlumnoId(alumnoId);
        relacion.setParentesco(parentesco);
        return apoderadoAlumnoRepository.save(relacion);
    }

    @Override
    public List<ApoderadoAlumno> listarAlumnosAsignados(Long apoderadoId) {
        return apoderadoAlumnoRepository.findByApoderadoId(apoderadoId);
    }
}