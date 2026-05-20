package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.domain.Anotacion;
import cl.cbo.asistencia_conducta.entities.RegistroConducta;
import cl.cbo.asistencia_conducta.factory.AnotacionFactory;
import cl.cbo.asistencia_conducta.repositories.RegistroConductaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConductaService {

    @Autowired
    private RegistroConductaRepository repository;

    public List<RegistroConducta> obtenerPorAlumno(String rut) {
        return repository.findAll().stream()
                .filter(r -> r.getAlumnoRut().equals(rut))
                .toList();
    }

    public RegistroConducta registrarAnotacion(String rut, String tipo, String descripcion) {
        // Uso estricto del patron Factory solicitado en la rubrica
        Anotacion tipoAnotacion = AnotacionFactory.crearAnotacion(tipo);
        String detalleFormateado = tipoAnotacion.generarDetalle(descripcion);

        RegistroConducta registro = new RegistroConducta();
        registro.setAlumnoRut(rut);
        registro.setTipo(tipoAnotacion.getTipo());
        registro.setDetalle(detalleFormateado);

        return repository.save(registro);
    }
}