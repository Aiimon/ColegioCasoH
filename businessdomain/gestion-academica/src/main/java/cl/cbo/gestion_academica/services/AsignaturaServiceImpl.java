package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Asignatura;
import cl.cbo.gestion_academica.repositories.AsignaturaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AsignaturaServiceImpl implements AsignaturaService {

    private final AsignaturaRepository asignaturaRepository;

    public AsignaturaServiceImpl(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }

    @Override
    public Asignatura crearAsignatura(Asignatura asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    @Override
    public List<Asignatura> listarTodas() {
        return asignaturaRepository.findAll();
    }
}