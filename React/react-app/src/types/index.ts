/**
 * Tipos genéricos reutilizables para toda la aplicación
 */

/**
 * Representa una columna genérica en la tabla de datos.
 * T es el tipo de los datos de la fila
 * K es una clave específica de T
 */
export interface DataTableColumn<T, K extends keyof T> {
  /** Clave del objeto T que renderizar */
  key: K;
  /** Etiqueta mostrada en el encabezado */
  label: string;
  /** Ancho opcional de la columna (en píxeles o unidades CSS) */
  width?: string | number;
  /** Función de renderizado opcional personalizada */
  render?: (value: T[K], row: T, index: number) => React.ReactNode;
}

/**
 * Estado temporal de edición usando el tipo Partial<T>
 * Permite que el usuario no haya completado todos los campos aún
 */
export interface EditingState<T> {
  /** Índice de la fila siendo editada, null si no hay edición activa */
  rowIndex: number | null;
  /** Datos parciales de la fila siendo editada */
  data: Partial<T>;
}

/**
 * Propiedades del componente DataTable genérico
 * T es el tipo de los datos de las filas
 */
export interface DataTableProps<T> {
  /** Array de datos a mostrar */
  data: T[];
  /** Array de definiciones de columnas */
  columns: DataTableColumn<T, keyof T>[];
  /** Callback opcional cuando se inicia la edición de una fila */
  onEditStart?: (rowIndex: number, row: T) => void;
  /** Callback opcional cuando se guarda una fila editada */
  onEditSave?: (rowIndex: number, updatedRow: T) => void;
  /** Callback opcional cuando se cancela la edición */
  onEditCancel?: () => void;
  /** Callback opcional cuando se elimina una fila */
  onDelete?: (rowIndex: number, row: T) => void;
  /** Indica si la tabla está en estado de carga */
  isLoading?: boolean;
  /** Mensaje de error a mostrar */
  error?: string;
}
