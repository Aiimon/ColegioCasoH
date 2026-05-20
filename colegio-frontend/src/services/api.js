import axios from 'axios';

// ===================================================================
// 1. CANAL DIRECTO: GESTIÓN ACADÉMICA (Puerto 8081)
// ===================================================================
const API_ACADEMICA = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

API_ACADEMICA.interceptors.request.use(request => {
    const timestamp = new Date().toISOString();
    console.log(`[FRONTEND-LOG] [${timestamp}] [Académico] Petición a: ${request.url}`);
    return request;
});

API_ACADEMICA.interceptors.response.use(
    response => response,
    error => {
        console.error(`[FRONTEND-ERROR] [Académico] Falla de comunicación:`, error.message);
        return Promise.reject(error);
    }
);

// ===================================================================
// 2. CANAL DIRECTO: ASISTENCIA Y CONDUCTA (Puerto 8082)
// ===================================================================
const API_CONDUCTA = axios.create({
    baseURL: 'http://localhost:8082/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

API_CONDUCTA.interceptors.request.use(request => {
    const timestamp = new Date().toISOString();
    console.log(`[FRONTEND-LOG] [${timestamp}] [Conducta] Petición a: ${request.url}`);
    return request;
});

API_CONDUCTA.interceptors.response.use(
    response => response,
    error => {
        console.error(`[FRONTEND-ERROR] [Conducta] Falla de comunicación:`, error.message);
        return Promise.reject(error);
    }
);

// ===================================================================
// 3. EXPORTACIÓN DE SERVICIOS
// ===================================================================
export const academyService = {
    // Apunta correctamente al puerto 8081
    getAlumnos: () => API_ACADEMICA.get('/academica/alumnos'),
};

export const conductService = {
    // CORREGIDO: Ahora le pega directamente al puerto 8082 usando su propio cliente
    getHojaVida: (rut) => API_CONDUCTA.get(`/conducta/alumno/${rut}`),
};