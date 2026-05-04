# Módulo 1: Inicialización y Lógica Pura

Laboratorio práctico de TypeScript con funciones de análisis estadístico.

## Estructura del Proyecto

```
modulo-1/
├── src/              # Código fuente TypeScript
│   ├── math-utils.ts # Funciones estadísticas
│   └── index.ts      # Archivo de pruebas
├── dist/             # Código compilado a JavaScript
├── docs/             # Documentación
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

```bash
npm install
```

## Desarrollo

Ejecutar el código con TypeScript en tiempo real:

```bash
npx tsx src/index.ts
```

## Compilación

Generar JavaScript en `dist/`:

```bash
npx tsc
```

Ejecutar el código compilado:

```bash
node dist/index.js
```

## Funciones Implementadas

### `calcularMedia(array: number[]): number | null`
Calcula la media aritmética de un array de números.
Retorna `null` si el array está vacío.

### `calcularMediana(array: number[]): number | null`
Calcula la mediana de un array de números.
Retorna `null` si el array está vacío.

### `filtrarAtipicos(array: number[], limite?: number): number[] | null`
Filtra valores atípicos (outliers) usando desviación estándar.
Parámetro `limite` = número de desviaciones estándar (por defecto 2).
Retorna `null` si el array está vacío.

## Configuración de TypeScript

El proyecto usa `strict: true` para validación de tipos estricta.
