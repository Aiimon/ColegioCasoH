// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, options = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      
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
  }, [url, options]);

  // Se ejecuta automáticamente al montar el componente o cambiar la URL
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retornamos data, loading, error y una función refetch para cuando quieras recargar la tabla manualmente
  return { data, loading, error, refetch: fetchData };
};