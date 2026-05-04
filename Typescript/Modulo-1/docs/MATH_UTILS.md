# Documentación - Módulo 1: Inicialización y Lógica Pura

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Funciones Implementadas](#funciones-implementadas)
4. [Configuración de TypeScript](#configuración-de-typescript)
5. [Conceptos Practicados](#conceptos-practicados)
6. [Ejecución y Verificación](#ejecución-y-verificación)

---

## Descripción General

El Módulo 1 es un laboratorio práctico introductorio de TypeScript que se enfoca en:

- **Inicialización de un proyecto TypeScript** desde cero
- **Lógica pura**: Funciones sin efectos secundarios que transforman datos
- **Type Safety**: Uso de tipos estrictos para prevenir errores
- **Análisis Estadístico**: Implementación de 3 funciones matemáticas de uso común

Este módulo establece las bases para los módulos posteriores, demostrando cómo TypeScript mejora la confiabilidad del código mediante tipado fuerte.

---

## Estructura del Proyecto

```
modulo-1/
├── src/
│   ├── math-utils.ts     # Funciones de análisis estadístico
│   └── index.ts          # Archivo de pruebas y ejemplos
├── dist/                 # Código compilado a JavaScript
├── docs/                 # Documentación
├── README.md             # Guía del proyecto
├── package.json          # Dependencias y configuración npm
└── tsconfig.json         # Configuración de TypeScript
```

---

## Funciones Implementadas

### 1. calcularMedia(array: number[]): number | null

**Propósito**: Calcula el promedio aritmético de un conjunto de números.

**Firma**:
```typescript
function calcularMedia(array: number[]): number | null
```

**Parámetros**:
- `array`: Array de números a promediar

**Retorno**:
- `number` si el array tiene elementos
- `null` si el array está vacío

**Implementación**:
```typescript
export function calcularMedia(array: number[]): number | null {
  if (array.length === 0) {
    return null;
  }
  
  const suma = array.reduce((acc, num) => acc + num, 0);
  return suma / array.length;
}
```

**Ejemplo**:
```typescript
calcularMedia([10, 20, 30])    // → 20
calcularMedia([5, 10, 15, 20]) // → 12.5
calcularMedia([])              // → null
```

**¿Por qué number | null?**

En TypeScript, cuando una función puede no tener un resultado válido, debemos indicarlo en el tipo de retorno. Retornar `null` es mejor que `undefined` o lanzar una excepción para casos límite predecibles.

---

### 2. calcularMediana(array: number[]): number | null

**Propósito**: Calcula el valor central de un conjunto ordenado de números.

**Firma**:
```typescript
function calcularMediana(array: number[]): number | null
```

**Casos**:
- Si el array tiene **longitud impar**: Retorna el elemento del medio
- Si el array tiene **longitud par**: Retorna el promedio de los dos elementos centrales
- Si el array está **vacío**: Retorna `null`

**Implementación**:
```typescript
export function calcularMediana(array: number[]): number | null {
  if (array.length === 0) {
    return null;
  }
  
  // Crear una copia y ordenar el array
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  // Si la longitud es impar, retornar el elemento del medio
  if (sorted.length % 2 !== 0) {
    const mediana = sorted[mid];
    return mediana ?? null;
  }
  
  // Si la longitud es par, retornar el promedio de los dos elementos del medio
  const elem1 = sorted[mid - 1];
  const elem2 = sorted[mid];
  
  if (elem1 === undefined || elem2 === undefined) {
    return null;
  }
  
  return (elem1 + elem2) / 2;
}
```

**Ejemplo**:
```typescript
calcularMediana([10, 20, 30])       // → 20 (impar, elemento del medio)
calcularMediana([10, 20, 30, 40])   // → 25 (par, promedio 20+30/2)
calcularMediana([3, 1, 2])          // → 2 (se ordena primero: [1,2,3])
calcularMediana([])                 // → null
```

**Nota importante**: La función crea una copia del array (`[...array]`) para no modificar el original. Esto es una buena práctica de programación funcional.

---

### 3. filtrarAtipicos(array: number[], limite?: number): number[] | null

**Propósito**: Elimina valores atípicos (outliers) basados en desviación estándar.

**Firma**:
```typescript
function filtrarAtipicos(array: number[], limite: number = 2): number[] | null
```

**Parámetros**:
- `array`: Array de números a filtrar
- `limite`: Número de desviaciones estándar (por defecto 2)
  - Un valor > 2 desviaciones se considera atípico

**Cómo funciona**:

1. Calcula la **media** del array
2. Calcula la **desviación estándar** (raíz cuadrada de la varianza)
3. Para cada valor, calcula su **score Z**: `(valor - media) / desviación`
4. Filtra valores donde `|score Z| > límite`

**Implementación**:
```typescript
export function filtrarAtipicos(array: number[], limite: number = 2): number[] | null {
  if (array.length === 0) {
    return null;
  }
  
  // Calcular media
  const media = calcularMedia(array);
  if (media === null) {
    return null;
  }
  
  // Calcular desviación estándar
  const varianza = array.reduce((acc, num) => acc + Math.pow(num - media, 2), 0) / array.length;
  const desviacionEstandar = Math.sqrt(varianza);
  
  // Filtrar valores atípicos
  const filtrados = array.filter((num) => {
    const z = Math.abs((num - media) / desviacionEstandar);
    return z <= limite;
  });
  
  return filtrados;
}
```

**Ejemplo**:
```typescript
const datos = [10, 12, 11, 13, 100, 12, 11, 14, 12, 13];
filtrarAtipicos(datos, 2)
// → [10, 12, 11, 13, 12, 11, 14, 12, 13] (elimina 100)

const datos2 = [100, 101, 102, 99, 101];
filtrarAtipicos(datos2, 2)
// → [100, 101, 102, 99, 101] (todos son normales)
```

**Matemática detrás**:
```
Media = (10+12+11+13+100+12+11+14+12+13) / 10 = 18.8
Desviación Estándar ≈ 27.3

Score Z del valor 100:
z = |100 - 18.8| / 27.3 ≈ 2.97 > 2 ❌ ATÍPICO

Score Z del valor 12:
z = |12 - 18.8| / 27.3 ≈ 0.25 < 2 ✓ NORMAL
```

---

## Configuración de TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "strict": true,
    "skipLibCheck": true,
    "moduleResolution": "nodenext"
  }
}
```

**Explicación de opciones**:

| Opción | Valor | Significado |
|--------|-------|-------------|
| `rootDir` | `./src` | Los archivos fuente están en la carpeta src |
| `outDir` | `./dist` | El código compilado se genera en dist |
| `module` | `nodenext` | Genera módulos ES6 compatibles con Node.js moderno |
| `target` | `esnext` | Compila a la versión más reciente de JavaScript |
| `strict` | `true` | **CRÍTICO**: Activa todas las verificaciones de tipo estrictas |
| `skipLibCheck` | `true` | Salta la verificación de archivos .d.ts en node_modules |
| `moduleResolution` | `nodenext` | Usa la resolución de módulos moderna |

### ¿Por qué "strict": true?

El modo strict de TypeScript habilita múltiples reglas de verificación:

- ✓ No permite `null` o `undefined` donde no se espera
- ✓ Requiere anotaciones explícitas de tipo cuando son ambiguas
- ✓ Previene el acceso a propiedades que podrían no existir
- ✓ Valida que las funciones siempre retornan algo

**Sin strict**:
```typescript
let x; // Tipo: any (peligroso)
function foo(a) { } // Parámetros implícitamente any

// Esto compila sin error (❌ MAL)
let valor: number = null; // Error de tipo no detectado
```

**Con strict**:
```typescript
let x: unknown; // Debe ser explícito
function foo(a: string) { } // Tipos requeridos

// Esto NO compila (✓ BIEN)
let valor: number = null; // ❌ ERROR: Type 'null' is not assignable to type 'number'
```

---

## Conceptos Practicados

### 1. Tipos Primitivos
```typescript
const numero: number = 42;
const texto: string = "hola";
const activo: boolean = true;
const fecha: Date = new Date();
```

### 2. Arrays Tipados
```typescript
const numeros: number[] = [1, 2, 3];
const mixtos: (number | string)[] = [1, "dos", 3];
```

### 3. Union Types
```typescript
function procesar(valor: number | string): void {
  // Lógica que maneja ambos tipos
}
```

### 4. Null vs Undefined
```typescript
// Retorna null explícitamente para "sin valor"
function calcularMedia(array: number[]): number | null

// En lugar de retornar undefined o lanzar excepción
```

### 5. Funciones Puras
Todas las funciones en `math-utils.ts` son **puras**:
- No modifican sus parámetros
- No dependen de estado externo
- Siempre retornan el mismo resultado para los mismos inputs

```typescript
// ✓ PURA
const resultado = calcularMedia([1, 2, 3]); // Siempre retorna 2

// ❌ NO PURA
let total = 0;
function sumarAlTotal(n: number) {
  total += n; // Modifica estado externo
}
```

### 6. Operadores de Seguridad
```typescript
// Nullish coalescing (retorna el lado derecho si left es null/undefined)
const mediana = sorted[mid] ?? null;

// Optional chaining (acceso seguro a propiedades)
const nombre = estudiante?.nombre;
```

---

## Ejecución y Verificación

### Desarrollo con tsx

```bash
npx tsx src/index.ts
```

Ejecuta TypeScript directamente sin compilación previa.

**Salida esperada**:
```
=== Laboratorio Práctico 1: Análisis Estadístico ===

--- Test: calcularMedia ---
Media de [10,15,20,25,30]: 20
Media de [5,10,15,20,25,30]: 17.5
Media de array vacío: null

--- Test: calcularMediana ---
Mediana de [10,15,20,25,30]: 20
Mediana de [5,10,15,20,25,30]: 17.5
Mediana de array vacío: null

--- Test: filtrarAtipicos ---
Datos originales: [10,12,11,13,100,12,11,14,12,13]
Datos sin atípicos (límite=2): [10, 12, 11, 13, 12, 11, 14, 12, 13]
Atípicos filtrados: [100]

--- Casos Límite ---
Media de [42]: 42
Mediana de [42]: 42
Filtrar atípicos [42]: []
```

### Compilación

```bash
npx tsc
```

Genera archivos JavaScript en `dist/`:
- `dist/math-utils.js` - Funciones compiladas
- `dist/index.js` - Archivo de pruebas compilado

### Ejecución Compilada

```bash
node dist/index.js
```

Produce la misma salida que con tsx.

---

## Archivos Generados

### src/math-utils.ts
Módulo exportado con las 3 funciones de análisis estadístico.
Cada función está documentada con JSDoc.

### src/index.ts
Archivo de pruebas que:
- Importa las funciones de `math-utils.ts`
- Crea datos de prueba
- Prueba cada función con casos normales y límite
- Imprime resultados formateados

### dist/
Contiene únicamente archivos `.js` compilados (sin `.d.ts` ni `.map`).

---

## Conclusión

El Módulo 1 proporciona una base sólida en TypeScript demostrando:

✓ Inicialización correcta de un proyecto
✓ Configuración de TypeScript con `strict: true`
✓ Funciones puras y reutilizables
✓ Manejo seguro de tipos (type safety)
✓ Casos límite y valores nulos
✓ Compilación y ejecución exitosa

Estos conceptos son fundamentales para los módulos posteriores donde se agregarán:
- Arquitectura de capas (Módulo 2)
- Patrones avanzados (Módulo 3)
- Integración y testing (Módulos posteriores)
