# React - Tabla de Datos Genérica con TypeScript

Una aplicación React fuertemente tipada que demuestra el uso avanzado de TypeScript con componentes genéricos, tipos de utilidad y análisis exhaustivo.

## 🚀 Características Implementadas

### ✅ Componente DataTable<T> Genérico
- **Tabla de datos completamente genérica** que funciona con cualquier tipo `T`
- **Props tipadas**: recibe array de datos `T[]` y configuración de columnas
- **Edición inline** con estado temporal usando `Partial<T>`
- **Type-safe**: TypeScript valida todas las operaciones en tiempo de compilación

### ✅ Utilidades de Fechas
- **Librería externa**: `date-fns` para cálculos de fechas
- **Función utilitaria**: `calculateDaysDifference()` con tipos estrictos
- **Validación de entrada**: acepta `Date` o `string` (formato ISO)

### ✅ Seguridad de Tipos TypeScript
- **0 errores de compilación**: `npx tsc --noEmit` pasa sin errores
- **Genéricos con constraints**: `T extends Record<string, unknown>`
- **Tipos de utilidad**: `Partial<T>`, `keyof T`
- **Type narrowing**: inferencia automática de tipos

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI moderno
- **TypeScript 5** - JavaScript con tipos estáticos
- **Vite** - Build tool ultrarrápido
- **date-fns** - Librería de manipulación de fechas
- **ESLint** - Linting y formateo de código

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── DataTable.tsx      # Componente genérico principal
│   └── DataTable.css      # Estilos de la tabla
├── types/
│   └── index.ts           # Definiciones de tipos TypeScript
├── utils/
│   └── dateUtils.ts       # Utilidades de fechas
├── App.tsx                # Componente raíz
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales

docs/
└── arquitectura-final.md  # Documentación arquitectónica
```

## 🏗️ Arquitectura TypeScript

Este proyecto demuestra cómo TypeScript reduce errores runtime mediante:

### Genéricos con Constraints
```typescript
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
}: DataTableProps<T>)
```

### Tipos de Utilidad
```typescript
// Estado de edición temporal - permite campos incompletos
interface EditingState<T> {
  rowIndex: number | null;
  data: Partial<T>;  // ← Tipo de utilidad
}
```

### Type-Safe Column Configuration
```typescript
interface DataTableColumn<T, K extends keyof T> {
  key: K;           // ← keyof T garantiza que existe
  label: string;
  render?: (value: T[K]) => React.ReactNode;  // ← T[K] infiere el tipo correcto
}
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build de Producción
```bash
npm run build
```

### Verificación de Tipos
```bash
npx tsc --noEmit  # Debe mostrar 0 errores
```

### Linting
```bash
npm run lint
```

## 📖 Ejemplo de Uso

```typescript
import { DataTable } from './components/DataTable';

// Definir tipo de datos
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fechaRegistro: Date;
}

// Configurar columnas
const columnas: DataTableColumn<Usuario, keyof Usuario>[] = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  {
    key: 'fechaRegistro',
    label: 'Registro',
    render: (value) => value.toLocaleDateString('es-ES')
  }
];

// Datos de ejemplo
const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    fechaRegistro: new Date('2024-01-15')
  }
];

// Usar el componente
function App() {
  return (
    <DataTable
      data={usuarios}
      columns={columnas}
      onEditSave={(index, usuarioActualizado) => {
        console.log('Usuario actualizado:', usuarioActualizado);
      }}
    />
  );
}
```

## 🧮 Utilidades de Fechas

```typescript
import { calculateDaysDifference } from './utils/dateUtils';

// Calcular diferencia entre fechas
const dias = calculateDaysDifference(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
console.log(dias); // 30

// También acepta strings ISO
const dias2 = calculateDaysDifference('2024-01-01', '2024-01-31');
console.log(dias2); // 30
```

## 📚 Documentación Arquitectónica

Para entender cómo este proyecto reduce errores runtime vs JavaScript estándar, consulta:

📄 **[`docs/arquitectura-final.md`](docs/arquitectura-final.md)**

Este documento explica:
- Comparativa JavaScript vs TypeScript avanzado
- Patrones implementados (genéricos, discriminated unions, never)
- Beneficios de type-safety en mantenimiento y escalabilidad

## 🎯 Beneficios de TypeScript en Este Proyecto

### ✅ Errores Detectados en Compilación
- Typos en nombres de propiedades
- Tipos incorrectos en funciones
- Props faltantes en componentes
- Casos no manejados en switches

### ✅ IntelliSense y Autocompletado
- Sugerencias automáticas de propiedades
- Validación de tipos en tiempo real
- Refactorización segura (rename symbols)

### ✅ Mantenimiento Simplificado
- Documentación automática via JSDoc
- Interfaces claras y reutilizables
- Código self-documenting

### ✅ Escalabilidad Arquitectónica
- Componentes reutilizables con genéricos
- Type-safe cuando se agregan nuevas features
- Análisis exhaustivo previene bugs

## 🤝 Contribución

Este proyecto demuestra mejores prácticas de TypeScript. Para contribuir:

1. Asegúrate de que `npx tsc --noEmit` pase sin errores
2. Mantén la cobertura de tipos al 100%
3. Sigue los patrones de genéricos y tipos de utilidad
4. Actualiza la documentación si cambias la API

## 📄 Licencia

Este proyecto es parte de un ejercicio educativo de TypeScript avanzado.
