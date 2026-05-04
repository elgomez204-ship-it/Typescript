# Módulo 2: Arquitectura de Acceso a Datos

Laboratorio práctico de TypeScript con modelado del dominio, uniones discriminadas y servicio genérico de datos.

## Estructura del Proyecto

```
modulo-2/
├── src/
│   ├── domain/
│   │   ├── types/
│   │   │   └── entities.ts    # Interfaces de dominio
│   │   └── reporte.ts         # Función generarReporte
│   ├── services/
│   │   └── api-client.ts      # Servicio genérico de datos
│   └── index.ts               # Archivo de pruebas
├── dist/                       # Código compilado
├── docs/
│   └── ARQUITECTURA.md         # Documentación detallada
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

```bash
npm install
```

## Desarrollo

Ejecutar el código con TypeScript:

```bash
npx tsx src/index.ts
```

## Compilación

```bash
npx tsc
```

Ejecutar el código compilado:

```bash
node dist/index.js
```

## Componentes Clave

### 1. Modelado del Dominio (`src/domain/types/entities.ts`)

- **Estudiante**: Interface que representa a un estudiante
- **Asignatura**: Interface que representa una materia
- **EstadoMatricula**: Unión discriminada con tres estados
  - `MatriculaActiva` (tipo: "ACTIVA")
  - `MatriculaSuspendida` (tipo: "SUSPENDIDA")
  - `MatriculaFinalizada` (tipo: "FINALIZADA")

### 2. Función generarReporte (`src/domain/reporte.ts`)

Utiliza un `switch` para evaluar el tipo discriminado y retorna un string descriptivo.

### 3. Servicio Genérico (`src/services/api-client.ts`)

- **RespuestaAPI<T>**: Interface genérica para respuestas
- **obtenerRecurso<T>()**: Método genérico que simula consultas a BD
- **obtenerRecursoDirecto<T>()**: Variación que retorna solo el dato

## Documentación

Ver [ARQUITECTURA.md](docs/ARQUITECTURA.md) para:
- Explicación detallada del diseño
- Decisiones de usar interfaces vs types
- Por qué readonly en los IDs
- Cómo funcionan las uniones discriminadas
- Beneficios de los genéricos

## Conceptos de TypeScript Practicados

✓ Interfaces con `readonly`
✓ Uniones discriminadas (Discriminated Unions)
✓ Type narrowing en switch
✓ Genéricos en funciones
✓ Promises y async/await tipados
✓ Type safety total
