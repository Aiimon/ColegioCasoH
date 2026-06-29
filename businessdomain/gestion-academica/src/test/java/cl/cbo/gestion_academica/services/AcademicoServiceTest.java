package cl.cbo.gestion_academica.services;

import cl.cbo.gestion_academica.entities.Alumno;
import cl.cbo.gestion_academica.entities.Evaluacion;
import cl.cbo.gestion_academica.entities.Nota;
import cl.cbo.gestion_academica.repositories.AlumnoRepository;
import cl.cbo.gestion_academica.repositories.EvaluacionRepository;
import cl.cbo.gestion_academica.repositories.NotaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AcademicoServiceTest {

    @Mock
    private AlumnoRepository alumnoRepository;

    @Mock
    private EvaluacionRepository evaluacionRepository;

    @Mock
    private NotaRepository notaRepository;

    @InjectMocks
    private AcademicoServiceImpl academicoService;

    private Alumno alumnoPrueba;
    private Evaluacion evaluacionPrueba;
    private Nota notaPrueba;

    @BeforeEach
    void setUp() {
        // Inicializar Alumno base
        alumnoPrueba = new Alumno();
        alumnoPrueba.setId(1L);
        alumnoPrueba.setRut("21345678-K");
        alumnoPrueba.setNombres("Esteban");
        alumnoPrueba.setApellidos("Pérez");
        alumnoPrueba.setCursoId(1L);
        alumnoPrueba.setActivo(true);

        // Inicializar Evaluacion base
        evaluacionPrueba = new Evaluacion();
        evaluacionPrueba.setId(1L);
        evaluacionPrueba.setNombre("Solemne 1");

        // Inicializar Nota base
        notaPrueba = new Nota();
        notaPrueba.setId(1L);
        notaPrueba.setValor(6.5);
        notaPrueba.setAlumnoId(1L);
    }

    // ===================================================================
    //  PRUEBAS DEL MÓDULO: MATRÍCULAS Y ALUMNOS (4 TESTS)
    // ===================================================================

    @Test
    void test1_matricularAlumnoExitoso() {
        when(alumnoRepository.findByRut(alumnoPrueba.getRut())).thenReturn(Optional.empty());
        when(alumnoRepository.save(alumnoPrueba)).thenReturn(alumnoPrueba);

        Alumno resultado = academicoService.matricularAlumno(alumnoPrueba);

        assertNotNull(resultado);
        assertEquals("21345678-K", resultado.getRut());
        verify(alumnoRepository, times(1)).save(alumnoPrueba);
    }

    @Test
    void test2_matricularAlumnoFallaPorRutDuplicado() {
        when(alumnoRepository.findByRut(alumnoPrueba.getRut())).thenReturn(Optional.of(alumnoPrueba));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            academicoService.matricularAlumno(alumnoPrueba);
        });

        assertEquals("El alumno con este RUT ya se encuentra matriculado.", exception.getMessage());
        verify(alumnoRepository, never()).save(any(Alumno.class));
    }

    @Test
    void test3_obtenerAlumnosPorCursoConRegistros() {
        List<Alumno> listaEsperada = Arrays.asList(alumnoPrueba);
        when(alumnoRepository.findByCursoIdAndActivoTrue(1L)).thenReturn(listaEsperada);

        List<Alumno> resultado = academicoService.obtenerAlumnosPorCurso(1L);

        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
        assertEquals("Esteban", resultado.get(0).getNombres());
    }

    @Test
    void test4_obtenerAlumnosPorCursoVacio() {
        when(alumnoRepository.findByCursoIdAndActivoTrue(99L)).thenReturn(Collections.emptyList());

        List<Alumno> resultado = academicoService.obtenerAlumnosPorCurso(99L);

        assertTrue(resultado.isEmpty());
        assertEquals(0, resultado.size());
    }

    // ===================================================================
    // 📑 PRUEBAS DEL MÓDULO: EVALUACIONES (2 TESTS)
    // ===================================================================

    @Test
    void test5_crearEvaluacionExitosa() {
        when(evaluacionRepository.save(evaluacionPrueba)).thenReturn(evaluacionPrueba);

        Evaluacion resultado = academicoService.crearEvaluacion(evaluacionPrueba);

        assertNotNull(resultado);
        assertEquals("Solemne 1", resultado.getNombre());
        verify(evaluacionRepository, times(1)).save(evaluacionPrueba);
    }

    @Test
    void test6_crearEvaluacionCamposVaciosPermitidosPorJpa() {
        Evaluacion evalVacia = new Evaluacion();
        when(evaluacionRepository.save(evalVacia)).thenReturn(evalVacia);

        Evaluacion resultado = academicoService.crearEvaluacion(evalVacia);

        assertNotNull(resultado);
        assertNull(resultado.getNombre());
    }

    // ===================================================================
    //  PRUEBAS DEL MÓDULO: NOTAS (4 TESTS)
    // ===================================================================

    @Test
    void test7_ingresarNotaExitosa() {
        when(notaRepository.save(notaPrueba)).thenReturn(notaPrueba);

        Nota resultado = academicoService.ingresarNota(notaPrueba);

        assertNotNull(resultado);
        assertEquals(6.5, resultado.getValor());
        verify(notaRepository, times(1)).save(notaPrueba);
    }

    @Test
    void test8_ingresarNotaFallaPorNotaMuyAlta() {
        Nota notaInvalida = new Nota();
        notaInvalida.setValor(7.1);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            academicoService.ingresarNota(notaInvalida);
        });

        assertEquals("La nota debe ser un valor numérico entre 1.0 y 7.0", exception.getMessage());
        verify(notaRepository, never()).save(any(Nota.class));
    }

    @Test
    void test9_ingresarNotaFallaPorNotaMuyBaja() {
        Nota notaInvalida = new Nota();
        notaInvalida.setValor(0.9);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            academicoService.ingresarNota(notaInvalida);
        });

        assertEquals("La nota debe ser un valor numérico entre 1.0 y 7.0", exception.getMessage());
        verify(notaRepository, never()).save(any(Nota.class));
    }

    @Test
    void test10_obtenerNotasAlumnoExistente() {
        List<Nota> notasEsperadas = Arrays.asList(notaPrueba);
        when(notaRepository.findByAlumnoId(1L)).thenReturn(notasEsperadas);

        List<Nota> resultado = academicoService.obtenerNotasAlumno(1L);

        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
        assertEquals(6.5, resultado.get(0).getValor());
        verify(notaRepository, times(1)).findByAlumnoId(1L);
    }
}