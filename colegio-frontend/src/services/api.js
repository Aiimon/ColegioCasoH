import axios from 'axios';

// Conexión directa al API Gateway / BFF
const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// LOGGING Y TRAZABILIDAD: Registra cada petición en consola para auditoría de rendimiento
API.interceptors.request.use(request => {
    const timestamp = new Date().toISOString();
    console.log(`[FRONTEND-LOG] [${timestamp}] Petición enviada a: ${request.url}`);
    return request;
});

API.interceptors.response.use(
    response => response,
    error => {
        console.error(`[FRONTEND-ERROR] Falla en comunicación con el BFF:`, error.message);
        return Promise.reject(error);
    }
);

export const academyService = {
    getAlumnos: () => API.get('/academica/alumnos'),
};

export const conductService = {
    getHojaVida: (rut) => API.get(`/conducta/alumno/${rut}`),
};