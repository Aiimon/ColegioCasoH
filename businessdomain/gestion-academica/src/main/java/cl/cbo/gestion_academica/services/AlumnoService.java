package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.dto.AlumnoDTO;
import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    public List<AlumnoDTO> obtenerTodos() {
        List<Alumno> alumnos = alumnoRepository.findAll();
        return alumnos.stream().map(this::convertirADto).collect(Collectors.toList());
    }

    public AlumnoDTO guardar(Alumno alumno) {
        Alumno nuevoAlumno = alumnoRepository.save(alumno);
        return convertirADto(nuevoAlumno);
    }

    private AlumnoDTO convertirADto(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();
        dto.setRut(alumno.getRut());
        dto.setNombreCompleto(alumno.getNombre() + " " + alumno.getApellido());
        dto.setCurso(alumno.getCurso());
        return dto;
    }
}