package cl.cbo.asistencia_conducta.services;

import cl.cbo.asistencia_conducta.entities.Anotacion;
import cl.cbo.asistencia_conducta.entities.Asistencia;
import cl.cbo.asistencia_conducta.repositories.AnotacionRepository;
import cl.cbo.asistencia_conducta.repositories.AsistenciaRepository;
import cl.cbo.asistencia_conducta.shared.TipoAnotacion;
import cl.cbo.asistencia_conducta.clients.AlumnoClient; 
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong; // 🚀 INCLUIDO: Importación explícita para Mockito
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AsistenciaConductaServiceTest {

    @Mock
    private AsistenciaRepository asistenciaRepository;

    @Mock
    private AnotacionRepository anotacionRepository;

    @Mock
    private AlumnoClient alumnoClient; 

    @InjectMocks
    private AsistenciaServiceImpl asistenciaService; 
    
    @InjectMocks
    private AnotacionServiceImpl anotacionService;

    private Asistencia asistenciaPrueba;
    private Anotacion anotacionPrueba;
    private LocalDate fechaHoy;

    @BeforeEach
    void setUp() {
        fechaHoy = LocalDate.now();

        // Inicializar Asistencia base
        asistenciaPrueba = new Asistencia();
        asistenciaPrueba.setId(1L);
        asistenciaPrueba.setAlumnoId(1L);
        asistenciaPrueba.setCursoId(1L);
        asistenciaPrueba.setFecha(fechaHoy);

        // Inicializar Anotacion base
        anotacionPrueba = new Anotacion();
        anotacionPrueba.setId(1L);
        anotacionPrueba.setAlumnoId(1L);
        anotacionPrueba.setDetalle("Falta a clases sin justificación");
        anotacionPrueba.setTipo(TipoAnotacion.NEGATIVA);
    }

    // ===================================================================
    // PRUEBAS DEL MÓDULO: ASISTENCIAS (5 TESTS)
    // ===================================================================

    @Test
    void test1_registrarListaExitoso() {
        List<Asistencia> listaIngresada = Arrays.asList(asistenciaPrueba);
        when(asistenciaRepository.saveAll(listaIngresada)).thenReturn(listaIngresada);

        List<Asistencia> resultado = asistenciaService.registrarLista(listaIngresada);

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(asistenciaRepository, times(1)).saveAll(listaIngresada);
    }

    @Test
    void test2_obtenerAsistenciaPorCursoYFechaConRegistros() {
        List<Asistencia> listaEsperada = Arrays.asList(asistenciaPrueba);
        when(asistenciaRepository.findByCursoIdAndFecha(1L, fechaHoy)).thenReturn(listaEsperada);

        List<Asistencia> resultado = asistenciaService.obtenerAsistenciaPorCursoYFecha(1L, fechaHoy);

        assertFalse(resultado.isEmpty()); // 🚀 CORREGIDO: Sintaxis assert recuperada
        assertEquals(1, resultado.size());
        verify(asistenciaRepository, times(1)).findByCursoIdAndFecha(1L, fechaHoy);
    }

    @Test
    void test3_obtenerAsistenciaPorCursoYFechaVacio() {
        when(asistenciaRepository.findByCursoIdAndFecha(99L, fechaHoy)).thenReturn(Collections.emptyList());

        List<Asistencia> resultado = asistenciaService.obtenerAsistenciaPorCursoYFecha(99L, fechaHoy);

        assertTrue(resultado.isEmpty());
    }

    @Test
    void test4_obtenerHistorialAlumnoExistente() {
        List<Asistencia> historialEsperado = Arrays.asList(asistenciaPrueba);
        when(asistenciaRepository.findByAlumnoId(1L)).thenReturn(historialEsperado);

        List<Asistencia> resultado = asistenciaService.obtenerHistorialAlumno(1L);

        assertFalse(resultado.isEmpty()); // 🚀 CORREGIDO: Sintaxis assert recuperada
        assertEquals(1, resultado.size());
    }

    @Test
    void test5_obtenerHistorialAlumnoSinRegistros() {
        when(asistenciaRepository.findByAlumnoId(99L)).thenReturn(Collections.emptyList());

        List<Asistencia> resultado = asistenciaService.obtenerHistorialAlumno(99L);

        assertTrue(resultado.isEmpty());
    }

    // ===================================================================
    // PRUEBAS DEL MÓDULO: ANOTACIONES Y CONDUCTA (5 TESTS)
    // ===================================================================

    @Test
    void test6_crearAnotacionExitosa() {
        anotacionPrueba.setDetalle("Falta a clases sin justificación");
        anotacionPrueba.setTipo(TipoAnotacion.NEGATIVA);

        when(anotacionRepository.save(any(Anotacion.class))).thenReturn(anotacionPrueba);

        Anotacion resultado = anotacionService.crearAnotacion(anotacionPrueba);

        assertNotNull(resultado, "El resultado del guardado exitoso no debe ser nulo");
        assertEquals("Falta a clases sin justificación", resultado.getDetalle());
        assertEquals(TipoAnotacion.NEGATIVA, resultado.getTipo());
        verify(anotacionRepository, times(1)).save(any(Anotacion.class));
    }

    @Test
    void test7_obtenerHojaDeVidaAlumnoConAnotaciones() {
        anotacionPrueba.setTipo(TipoAnotacion.NEGATIVA); 
        List<Anotacion> hojaEsperada = Arrays.asList(anotacionPrueba);
        
        when(anotacionRepository.findByAlumnoIdOrderByFechaDesc(eq(1L))).thenReturn(hojaEsperada);
        
        // Simulación segura para cualquier ID de tipo Long
        when(alumnoClient.obtenerAlumnoPorId(anyLong())).thenReturn(null); 

        List<Anotacion> resultado = anotacionService.obtenerHojaDeVidaAlumno(1L);

        assertNotNull(resultado, "La lista resultado no debería ser nula");
        assertFalse(resultado.isEmpty(), "La hoja de vida no debería estar vacía"); // 🚀 CORREGIDO: Sintaxis assert recuperada
        assertEquals(TipoAnotacion.NEGATIVA, resultado.get(0).getTipo(), "El tipo de anotación debe ser NEGATIVA");
        verify(anotacionRepository, times(1)).findByAlumnoIdOrderByFechaDesc(1L);
    }

    @Test
    void test8_obtenerHojaDeVidaAlumnoLimpia() {
        when(anotacionRepository.findByAlumnoIdOrderByFechaDesc(99L)).thenReturn(Collections.emptyList());

        List<Anotacion> resultado = anotacionService.obtenerHojaDeVidaAlumno(99L);

        assertTrue(resultado.isEmpty());
    }

    @Test
    void test9_eliminarAnotacionExitosa() {
        doNothing().when(anotacionRepository).deleteById(1L);

        assertDoesNotThrow(() -> {
            anotacionService.eliminarAnotacion(1L);
        });

        verify(anotacionRepository, times(1)).deleteById(1L);
    }

    @Test
    void test10_crearAnotacionObjetoVacio() {
        Anotacion anotacionVacia = new Anotacion();

        when(anotacionRepository.save(any(Anotacion.class))).thenReturn(anotacionVacia);

        Anotacion resultado = anotacionService.crearAnotacion(anotacionVacia);

        assertNotNull(resultado, "El resultado no debería ser nulo");
        assertNull(resultado.getDetalle(), "El detalle debería permanecer nulo para un objeto vacío");
    }
}