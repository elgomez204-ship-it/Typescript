# Documentación de Arquitectura - Módulo 2

## Índice
1. [Modelado del Dominio](#modelado-del-dominio)
2. [Servicio de Datos Genérico](#servicio-de-datos-genérico)
3. [Decisiones de Diseño](#decisiones-de-diseño)

---

## Modelado del Dominio

### Entidades Principales

#### Estudiante
```typescript
interface Estudiante {
  readonly id: number;
  nombre: string;
  correo: string;
  carrera: string;
  semestre: number;
}
```

Representa a un estudiante en el sistema universitario. El `id` es inmutable (`readonly`) para garantizar que identificadores únicos no sean modificados accidentalmente.

#### Asignatura
```typescript
interface Asignatura {
  readonly id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  profesor: string;
}
```

Representa una materia ofrecida por la universidad. Al igual que Estudiante, su `id` es inmutable.

### Unión Discriminada: EstadoMatricula

La matrícula de un estudiante puede estar en uno de tres estados posibles:

```typescript
type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```

#### MatriculaActiva
```typescript
interface MatriculaActiva {
  readonly tipo: "ACTIVA";
  asignaturas: Asignatura[];
  fechaMatricula: Date;
}
```
Estado cuando el estudiante está activamente matriculado en asignaturas.

#### MatriculaSuspendida
```typescript
interface MatriculaSuspendida {
  readonly tipo: "SUSPENDIDA";
  motivo: string;
  fechaSuspension: Date;
}
```
Estado cuando la matrícula ha sido suspendida temporalmente.

#### MatriculaFinalizada
```typescript
interface MatriculaFinalizada {
  readonly tipo: "FINALIZADA";
  notaMedia: number;
  fechaFinalización: Date;
}
```
Estado cuando el estudiante ha completado su programa.

---

## Servicio de Datos Genérico

### RespuestaAPI<T>

```typescript
interface RespuestaAPI<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}
```

Esta interfaz genérica asegura que **todas las respuestas de la "API"** tengan la misma estructura, sin importar qué datos contengan.

### Método genérico: obtenerRecurso<T>()

```typescript
async function obtenerRecurso<T>(
  endpoint: string,
  delayMs: number = 500
): Promise<RespuestaAPI<T>>
```

#### ¿Por qué genéricos aquí?

**Los genéricos nos permiten:**

1. **Reutilizar código**: Una sola función maneja Estudiantes, Asignaturas, o cualquier tipo futuro.
2. **Type Safety**: TypeScript sabe exactamente qué tipo esperas recibir.
3. **Abstracción**: El cliente no necesita saber cómo la BD devuelve datos, solo recibe algo tipado.

#### Ejemplo de uso:
```typescript
// TypeScript sabe que respuesta.data es de tipo Estudiante
const respuesta = await obtenerRecurso<Estudiante>("/estudiantes/1");

// Si accedes respuesta.data, el autocompletado te sugiere:
// nombre, correo, carrera, semestre
```

---

## Decisiones de Diseño

### 1. Interfaces vs Types

**¿Por qué usamos `interface` en lugar de `type`?**

| Aspecto | Interface | Type |
|--------|-----------|------|
| **Extensibilidad** | Permite `extends` múltiple y declaration merging | Solo permite intersecciones |
| **Documentación** | Ideal para contratos públicos | Mejor para alias simples |
| **Performance** | Más eficiente en compilación | Ligeramente más lenta |
| **Uso** | Entidades del dominio | Uniones, condicionales |

**Nuestra elección:**
- **Interfaces** para `Estudiante`, `Asignatura`, `MatriculaActiva`, etc. → Son "contratos" claros de la estructura de datos.
- **Type** para `EstadoMatricula` → Es una unión discriminada, no es extensible directamente.

---

### 2. readonly para IDs

```typescript
readonly id: number;
```

**¿Por qué?**

- **Prevención de errores**: TypeScript impedirá que accidentalmente hagas `estudiante.id = 99`.
- **Claridad de intención**: Comunica que los IDs son fundamentales y no deben cambiar.
- **Seguridad de datos**: Identidades únicas deben ser inmutables.

**Ejemplo de protección:**
```typescript
const estudiante: Estudiante = { id: 1, ... };
estudiante.id = 2; // ❌ ERROR: Cannot assign to 'id' because it is a readonly property
```

---

### 3. Uniones Discriminadas

```typescript
type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```

**¿Por qué uniones discriminadas?**

Las uniones discriminadas permiten **type narrowing** automático basado en una propiedad común:

```typescript
function procesar(estado: EstadoMatricula) {
  switch (estado.tipo) {
    case "ACTIVA":
      // Aquí TypeScript SABE que estado es MatriculaActiva
      // Puedes acceder a estado.asignaturas sin problemas
      console.log(estado.asignaturas);
      break;
      
    case "SUSPENDIDA":
      // Aquí TypeScript SABE que estado es MatriculaSuspendida
      console.log(estado.motivo); // ✓ Disponible
      console.log(estado.asignaturas); // ❌ No existe en este tipo
      break;
  }
}
```

**Alternativa (sin discriminación):**
```typescript
type EstadoMatricula = MatriculaActiva | MatriculaSuspendida;

function procesar(estado: EstadoMatricula) {
  // TypeScript NO sabe si es activa o suspendida
  console.log(estado.asignaturas); // ❌ Podría no existir
}
```

**Con discriminación, eres más seguro y el código es más legible.**

---

### 4. Patrón de Servicio Genérico

El servicio `api-client.ts` demuestra un patrón común en aplicaciones empresariales:

**Ventajas:**
- ✓ **Único punto de control**: Cambios en la API se hacen en un solo lugar.
- ✓ **Consistencia**: Todas las respuestas tienen la misma estructura.
- ✓ **Manejo de errores centralizado**: Manejo de fallos en un lugar.
- ✓ **Type Safety total**: Cada llamada es fuertemente tipada.

**Ejemplo sin genéricos (❌ Mal):**
```typescript
async function obtenerEstudiante(id: number) {
  const res = await fetch(`/api/estudiantes/${id}`);
  return res.json(); // ¿Qué tipo retorna? ¿`any`?
}

async function obtenerAsignatura(id: number) {
  const res = await fetch(`/api/asignaturas/${id}`);
  return res.json(); // Mismo problema, código duplicado
}
```

**Con genéricos (✓ Bien):**
```typescript
async function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
  // Una sola función, infinitos tipos posibles
  const res = await fetch(endpoint);
  return res.json();
}

// Uso:
const estudiante = await obtenerRecurso<Estudiante>("/estudiantes/1");
const asignatura = await obtenerRecurso<Asignatura>("/asignaturas/1");
```

---

## Conclusión

Este diseño demuestra cómo TypeScript permite:
1. **Modelar estructuras complejas** con discriminación de tipos.
2. **Crear código reutilizable y seguro** con genéricos.
3. **Prevenir errores comunes** con `readonly` y tipado estricto.
4. **Mantener flexibilidad** mientras se preserva la seguridad de tipos.

Todos estos patrones escalan bien en aplicaciones empresariales reales.
