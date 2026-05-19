import { useState, useEffect } from 'react';
import { academyService, conductService } from './services/api';
import AvisoEtico from './components/AvisoEtico';
import { User, ClipboardList, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [hojaVida, setHojaVida] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    // Definimos una función asíncrona aislada para evitar bloqueos
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        const response = await academyService.getAlumnos();
        setAlumnos(response.data);
      } catch (error) {
        console.error("Error al conectar con el BFF:", error);
        setError("Falla de conexión con el API Gateway (BFF). Verifica que el puerto 8080 esté arriba.");
      } finally {
        setLoading(false);
      }
    };

    // La ejecutamos de inmediato
    fetchAlumnos();
  }, []);

  const cargarHojaVida = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setHojaVida([]);
    conductService.getHojaVida(alumno.rut)
      .then(response => {
        setHojaVida(response.data);
      })
      .catch(() => {
        setHojaVida([]);
      });
  };

  return (
    <div style={{ padding: '30px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dee2e6', marginBottom: '20px', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1a252f', fontSize: '28px' }}>🏫 Plataforma Integral de Gestión Escolar</h1>
          <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>Arquitectura Distribuida React + Spring Cloud BFF (Port: 8080)</p>
        </div>
        <div style={{ fontSize: '12px', backgroundColor: '#343a40', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
          MONITOREO: ONLINE
        </div>
      </header>

      <AvisoEtico />

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '6px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#495057' }}>
          <RefreshCw className="spin" size={30} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Conectando con microservicios...</p>
          <style>{`@keyframes spin { 100% { transform:rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User color="#007bff" /> Estudiantes Registrados (Módulo Académico)
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #dee2e6', color: '#495057', fontSize: '14px' }}>
                    <th style={{ padding: '12px 8px' }}>RUT</th>
                    <th style={{ padding: '12px 8px' }}>Nombre Completo</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map(al => (
                    <tr key={al.rut} style={{ borderBottom: '1px solid #eee', fontSize: '15px' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '500' }}>{al.rut}</td>
                      <td style={{ padding: '12px 8px' }}>{al.nombre} {al.apellido}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                        <button onClick={() => cargarHojaVida(al)} style={{ padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                          Consultar Historial
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList color="#28a745" /> Bitácora de Conducta (Patrón Factory)
            </h2>
            {alumnoSeleccionado ? (
              <div>
                <div style={{ backgroundColor: '#f1f3f5', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px' }}>
                  <p style={{ margin: '0 0 5px 0' }}><strong>Estudiante:</strong> {alumnoSeleccionado.nombre} {alumnoSeleccionado.apellido}</p>
                  <p style={{ margin: 0 }}><strong>ID Escolar (RUT):</strong> {alumnoSeleccionado.rut}</p>
                </div>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#495057' }}>Eventos Registrados:</h4>
                {hojaVida.length > 0 ? (
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    {hojaVida.map((anotacion, idx) => (
                      <div key={idx} style={{
                        padding: '12px',
                        borderRadius: '6px',
                        borderLeft: `5px solid ${anotacion.tipo === 'NEGATIVA' ? '#dc3545' : '#28a745'}`,
                        backgroundColor: anotacion.tipo === 'NEGATIVA' ? '#fff5f5' : '#f4fbf7'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: anotacion.tipo === 'NEGATIVA' ? '#c53030' : '#22543d' }}>
                          <span>TIPO: {anotacion.tipo}</span>
                          <span>ID REGISTRO: #{anotacion.id}</span> {/* Cambiado fecha por ID para aprovechar tus datos */}
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#2d3748' }}>{anotacion.detalle}</p> {/* Cambiado descripcion por detalle */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#6c757d', fontSize: '14px', fontStyle: 'italic' }}>El estudiante mantiene una hoja de vida limpia sin anotaciones.</p>
                )}
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6c757d' }}>
                <ClipboardList size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
                <p style={{ fontSize: '14px' }}>Selecciona un alumno del panel izquierdo para auditar su expediente en tiempo real a través de los microservicios.</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}