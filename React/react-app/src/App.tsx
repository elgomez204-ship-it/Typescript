import React, { useState } from 'react';
import { DataTable } from './components/DataTable';
import { calculateDaysDifference, calculateAge } from './utils/dateUtils';
import type { DataTableColumn } from './types';
import './App.css';

/**
 * Interfaz para datos de ejemplo: Estudiante
 */
interface Estudiante {
  id: number;
  nombre: string;
  correo: string;
  carrera: string;
  semestre: number;
  fechaIngreso: Date;
}

/**
 * Componente principal que demuestra el uso del DataTable<T> genérico
 * 
 * Características demostradas:
 * - Componente genérico fuertemente tipado
 * - Partial<T> para estado de edición
 * - Integración con date-fns
 * - Type safety completo
 */
function App(): JSX.Element {
  // Datos de ejemplo - array de Estudiante
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      nombre: 'Juan García',
      correo: 'juan@universidad.edu',
      carrera: 'Ingeniería Informática',
      semestre: 6,
      fechaIngreso: new Date('2020-08-15')
    },
    {
      id: 2,
      nombre: 'María López',
      correo: 'maria@universidad.edu',
      carrera: 'Administración de Empresas',
      semestre: 4,
      fechaIngreso: new Date('2022-01-20')
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      correo: 'carlos@universidad.edu',
      carrera: 'Ingeniería Civil',
      semestre: 8,
      fechaIngreso: new Date('2019-02-10')
    }
  ]);

  // Definición de columnas - fuertemente tipada para Estudiante
  const columns: DataTableColumn<Estudiante, keyof Estudiante>[] = [
    {
      key: 'id',
      label: 'ID',
      width: '60px',
      render: (value) => `#${value}`
    },
    {
      key: 'nombre',
      label: 'Nombre Completo',
      width: '180px'
    },
    {
      key: 'correo',
      label: 'Correo Electrónico',
      width: '220px'
    },
    {
      key: 'carrera',
      label: 'Carrera',
      width: '200px'
    },
    {
      key: 'semestre',
      label: 'Semestre',
      width: '100px',
      render: (value) => `${value}º semestre`
    },
    {
      key: 'fechaIngreso',
      label: 'Antigüedad (años)',
      width: '150px',
      render: (value) => {
        if (!(value instanceof Date)) return 'N/A';
        try {
          const years = calculateAge(value);
          return years.toFixed(1);
        } catch {
          return 'Error';
        }
      }
    }
  ];

  // Handlers del DataTable
  const handleEditSave = (rowIndex: number, updatedRow: Estudiante): void => {
    const newEstudiantes = [...estudiantes];
    newEstudiantes[rowIndex] = updatedRow;
    setEstudiantes(newEstudiantes);
    alert(`Estudiante actualizado: ${updatedRow.nombre}`);
  };

  const handleDelete = (rowIndex: number, row: Estudiante): void => {
    const newEstudiantes = estudiantes.filter((_, idx) => idx !== rowIndex);
    setEstudiantes(newEstudiantes);
    alert(`Estudiante eliminado: ${row.nombre}`);
  };

  // Calcular estadísticas usando date-fns
  const calcularEstadisticas = (): { totalEstudiantes: number; daysActive: number } => {
    const totalEstudiantes = estudiantes.length;
    const firstEnrollment = estudiantes[0]?.fechaIngreso || new Date();
    const daysActive = calculateDaysDifference(firstEnrollment, new Date());
    
    return { totalEstudiantes, daysActive };
  };

  const stats = calcularEstadisticas();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Estudiantes</h1>
        <p className="subtitle">Demostración de Componente DataTable genérico y fuertemente tipado</p>
      </header>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Estudiantes</h3>
          <p className="stat-value">{stats.totalEstudiantes}</p>
        </div>
        <div className="stat-card">
          <h3>Días del Sistema Activo</h3>
          <p className="stat-value">{stats.daysActive}</p>
        </div>
      </div>

      <div className="table-section">
        <h2>Tabla de Estudiantes</h2>
        <DataTable<Estudiante>
          data={estudiantes}
          columns={columns}
          onEditSave={handleEditSave}
          onDelete={handleDelete}
        />
      </div>

      <footer className="app-footer">
        <p>
          Este componente demuestra:
        </p>
        <ul>
          <li>✓ Genéricos en TypeScript (DataTable&lt;T&gt;)</li>
          <li>✓ Tipos de utilidad (Partial&lt;T&gt; para edición)</li>
          <li>✓ Integración con librerías externas (date-fns)</li>
          <li>✓ Type-safety completo en tiempo de compilación</li>
          <li>✓ Discriminated Unions para manejo robusto de estados</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
