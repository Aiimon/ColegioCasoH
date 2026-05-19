// src/context/AuthContext.jsx
import { createContext, useState, useCallback } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext(null);

// 2. Creamos el Proveedor
export function AuthProvider({ children }) {
  // Inicializamos el estado directamente leyendo localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('school_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  // Quitamos 'setLoading' porque el estado nace listo y no cambia internamente aquí
  const [loading] = useState(false);

  // FUNCIÓN: Login institucional
  const login = useCallback(async (email, password) => {
    try {
      if (email === 'profesor@colegio.cl' && password === '123456') {
        const userData = { email, name: "Profesor O'Higgins", role: 'docente' };
        setUser(userData);
        localStorage.setItem('school_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Credenciales inválidas. Intente nuevamente.' };
      }
    } catch (err) {
      console.error("Error en el proceso de login:", err);
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }, []);

  // FUNCIÓN: Cerrar sesión
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('school_user');
  }, []);

  // RENDER: Proveedor del estado global
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Exportamos el contexto de manera limpia para ESLint
export { AuthContext };