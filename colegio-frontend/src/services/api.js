import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL base de tu Gateway
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📑 SERVICIO ACADÉMICO (¡Ajustado para no retornar HTML!)
export const academyService = {
  getAlumnosPorCurso: (cursoId) => api.get(`/academica/alumnos/curso/${cursoId}`),
  getCursos: () => api.get('/academica/cursos/anio/2026'), 
  getAlumnos: () => api.get('/academica/alumnos/curso/1'),
  
  // 🛠️ Agrégalos aquí abajo para que queden nativos:
  getProfesores: () => api.get('/usuarios/profesores'),
  getTodosAlumnos: () => api.get('/academica/alumnos')
};

// 📝 SERVICIO CONDUCTAL
export const conductService = {
  // Este ya nos funcionó repitiendo la palabra clave
  getHojaVida: (alumnoId) => api.get(`/conducta/conducta/alumno/${alumnoId}`),
};

export default api;