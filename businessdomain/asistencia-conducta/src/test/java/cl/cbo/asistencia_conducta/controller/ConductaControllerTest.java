package cl.cbo.asistencia_conducta.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

// Importaciones estáticas necesarias para las aserciones de MockMvc
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ConductaControllerTest {
    // ... todo el resto de tus @Test abajo quedan exactamente igual

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetHojaVidaEstebanQuito_DebeRetornarAnotacionNegativaConFactory() throws Exception {
        // RUT de Esteban Quito configurado en tu controlador mock
        String rutTest = "12345678-9";

        mockMvc.perform(get("/api/v1/conducta/alumno/" + rutTest)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Verifica indicador de logro: Retorna 200 OK
                .andExpect(jsonPath("$", hasSize(1))) // Verifica que retorne un registro
                .andExpect(jsonPath("$[0].tipo", is("NEGATIVA"))) // Verifica consistencia del Patrón Factory
                .andExpect(jsonPath("$[0].detalle", containsString("[GRAVEDAD/ADVERTENCIA]:"))); // Verifica el prefijo dinámico
    }

    @Test
    public void testGetHojaVidaAlumnoLimpio_DebeRetornarListaVacia() throws Exception {
        String rutLimpio = "11111111-1";

        mockMvc.perform(get("/api/v1/conducta/alumno/" + rutLimpio)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
}