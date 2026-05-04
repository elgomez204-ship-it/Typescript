import {
  calcularMedia,
  calcularMediana,
  filtrarAtipicos,
} from "./math-utils.js";

console.log("=== Laboratorio Práctico 1: Análisis Estadístico ===\n");

// Conjunto de datos de prueba
const datos1 = [10, 15, 20, 25, 30];
const datos2 = [5, 10, 15, 20, 25, 30];
const datosConAtipicos = [10, 12, 11, 13, 100, 12, 11, 14, 12, 13];
const arrayVacio: number[] = [];

// Test calcularMedia
console.log("--- Test: calcularMedia ---");
console.log(`Media de [${datos1}]: ${calcularMedia(datos1)}`);
console.log(`Media de [${datos2}]: ${calcularMedia(datos2)}`);
console.log(`Media de array vacío: ${calcularMedia(arrayVacio)}`);
console.log();

// Test calcularMediana
console.log("--- Test: calcularMediana ---");
console.log(`Mediana de [${datos1}]: ${calcularMediana(datos1)}`);
console.log(`Mediana de [${datos2}]: ${calcularMediana(datos2)}`);
console.log(`Mediana de array vacío: ${calcularMediana(arrayVacio)}`);
console.log();

// Test filtrarAtipicos
console.log("--- Test: filtrarAtipicos ---");
console.log(`Datos originales: [${datosConAtipicos}]`);
const datosFiltrados = filtrarAtipicos(datosConAtipicos, 2);
console.log(
  `Datos sin atípicos (límite=2): [${
    datosFiltrados ? datosFiltrados.join(", ") : "null"
  }]`
);
console.log(`Atípicos filtrados: [${100}]`);
console.log();

// Casos límite
console.log("--- Casos Límite ---");
const arrayUnElemento = [42];
console.log(`Media de [${arrayUnElemento}]: ${calcularMedia(arrayUnElemento)}`);
console.log(`Mediana de [${arrayUnElemento}]: ${calcularMediana(arrayUnElemento)}`);
console.log(
  `Filtrar atípicos [${arrayUnElemento}]: [${
    filtrarAtipicos(arrayUnElemento) || "null"
  }]`
);
