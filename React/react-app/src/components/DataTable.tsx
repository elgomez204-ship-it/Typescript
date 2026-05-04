import React, { useState } from 'react';
import type { DataTableProps, DataTableColumn, EditingState } from '../types';
import './DataTable.css';

/**
 * Componente DataTable genérico y fuertemente tipado
 * 
 * Características:
 * - Soporta cualquier tipo T como datos de fila
 * - Gestión de estado de edición con Partial<T>
 * - Renderizado personalizable por columna
 * - Type-safe: TypeScript valida todas las operaciones
 * 
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * const columns: DataTableColumn<User, keyof User>[] = [
 *   { key: 'id', label: 'ID', width: '100px' },
 *   { key: 'name', label: 'Nombre' },
 *   { key: 'email', label: 'Email' }
 * ];
 * 
 * <DataTable<User> data={users} columns={columns} />
 */
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  onEditStart,
  onEditSave,
  onEditCancel,
  onDelete,
  isLoading = false,
  error
}: DataTableProps<T>): JSX.Element {
  // Estado de edición con Partial<T> - el usuario puede no completar todos los campos
  const [editingState, setEditingState] = useState<EditingState<T>>({
    rowIndex: null,
    data: {}
  });

  /**
   * Inicia la edición de una fila
   * Copia los datos actuales al estado de edición
   */
  const handleEditStart = (rowIndex: number, row: T): void => {
    setEditingState({
      rowIndex,
      data: { ...row } // Copia superficial para edición
    });
    onEditStart?.(rowIndex, row);
  };

  /**
   * Actualiza un campo en el estado de edición
   * Usa Partial<T> para permitir ediciones incompletas
   */
  const handleFieldChange = <K extends keyof T>(
    key: K,
    value: T[K]
  ): void => {
    setEditingState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };

  /**
   * Guarda la fila editada
   * Valida que tenga datos antes de guardar
   */
  const handleSave = (): void => {
    if (editingState.rowIndex !== null) {
      // Fusiona los datos originales con los cambios editados
      const updatedRow = {
        ...data[editingState.rowIndex],
        ...editingState.data
      } as T;
      
      onEditSave?.(editingState.rowIndex, updatedRow);
      setEditingState({ rowIndex: null, data: {} });
    }
  };

  /**
   * Cancela la edición
   */
  const handleCancel = (): void => {
    setEditingState({ rowIndex: null, data: {} });
    onEditCancel?.();
  };

  /**
   * Inicia la eliminación de una fila
   */
  const handleDeleteRow = (rowIndex: number, row: T): void => {
    if (confirm('¿Estás seguro de que quieres eliminar esta fila?')) {
      onDelete?.(rowIndex, row);
    }
  };

  // Renderización condicional para estado de carga
  if (isLoading) {
    return <div className="datatable-loading">Cargando datos...</div>;
  }

  // Renderización condicional para errores
  if (error) {
    return <div className="datatable-error">Error: {error}</div>;
  }

  // Renderización condicional para tabla vacía
  if (data.length === 0) {
    return <div className="datatable-empty">No hay datos disponibles</div>;
  }

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={editingState.rowIndex === rowIndex ? 'editing' : ''}
            >
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {editingState.rowIndex === rowIndex ? (
                    // Modo edición: renderizar input
                    <EditableCell<T>
                      column={column}
                      value={
                        editingState.data[column.key] ??
                        row[column.key]
                      }
                      onChange={(value) => handleFieldChange(column.key, value)}
                    />
                  ) : (
                    // Modo lectura: usar render personalizado o valor por defecto
                    column.render?.(
                      row[column.key],
                      row,
                      rowIndex
                    ) ?? String(row[column.key])
                  )}
                </td>
              ))}
              <td className="actions-cell">
                {editingState.rowIndex === rowIndex ? (
                  <>
                    <button
                      className="btn btn-save"
                      onClick={handleSave}
                      title="Guardar cambios"
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={handleCancel}
                      title="Cancelar edición"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditStart(rowIndex, row)}
                      title="Editar fila"
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteRow(rowIndex, row)}
                      title="Eliminar fila"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Componente auxiliar para editar una celda
 * Renderiza un input con el tipo adecuado según el tipo de dato
 */
interface EditableCellProps<T> {
  column: DataTableColumn<T, keyof T>;
  value: unknown;
  onChange: (value: unknown) => void;
}

function EditableCell<T>({
  column,
  value,
  onChange
}: EditableCellProps<T>): JSX.Element {
  // Determinar el tipo de input según el tipo de dato
  const getInputType = (): string => {
    if (typeof value === 'number') return 'number';
    if (value instanceof Date) return 'datetime-local';
    return 'text';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    
    // Convertir al tipo apropiado
    if (getInputType() === 'number') {
      onChange(Number(newValue));
    } else if (getInputType() === 'datetime-local') {
      onChange(new Date(newValue));
    } else {
      onChange(newValue);
    }
  };

  return (
    <input
      type={getInputType()}
      value={
        value instanceof Date
          ? value.toISOString().slice(0, 16)
          : String(value)
      }
      onChange={handleChange}
      className="editable-cell-input"
    />
  );
}
