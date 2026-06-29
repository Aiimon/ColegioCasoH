import axios from 'axios';

// Apuntamos al endpoint que habilitamos en el Gateway/Gestion Academica
const AUTH_URL = 'http://localhost:8080/api/auth/login';

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(AUTH_URL, { email, password });
    return response.data; // Retorna el JSON que contiene el { token: "ey..." }
  } catch (error) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

export const logoutService = () => {
  localStorage.removeItem('token');
};