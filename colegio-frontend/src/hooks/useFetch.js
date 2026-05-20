import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (url, options = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Guardamos las opciones en una referencia persistente en memoria
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, optionsRef.current || undefined);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // 🛠️ SOLUCIÓN MÁXIMA: Función autoejecutable con captura explícita de errores
  useEffect(() => {
    const callFetch = async () => {
      await fetchData();
    };
    
    callFetch().catch((err) => {
      console.error("Error en el ciclo del efecto:", err);
    });
  }, [fetchData]);

  // Retornamos data, loading, error y una función refetch para cuando quieras recargar la tabla manualmente
  return { data, loading, error, refetch: fetchData };
};