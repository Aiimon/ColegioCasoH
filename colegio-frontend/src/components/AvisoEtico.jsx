import { ShieldCheck } from 'lucide-react';

export default function AvisoEtico() {
  return (
    <div style={{
      backgroundColor: '#e6f4ea',
      color: '#137333',
      padding: '12px 20px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      border: '1px solid #ceead6'
    }}>
      <ShieldCheck size={20} />
      <span>
        <strong>Compromiso Ético y de Confidencialidad:</strong> Este sistema cumple con los estándares éticos de protección de datos del estudiante. La consulta de hojas de vida y antecedentes conductuales está estrictamente restringida a personal docente autorizado.
      </span>
    </div>
  );
}