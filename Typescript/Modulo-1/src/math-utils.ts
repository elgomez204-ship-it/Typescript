/**
 * Calcula la media aritmética de un array de números
 * @param array - Array de números
 * @returns La media del array, o null si el array está vacío
 */
export function calcularMedia(array: number[]): number | null {
  if (array.length === 0) {
    return null;
  }
  
  const suma = array.reduce((acc, num) => acc + num, 0);
  return suma / array.length;
}

/**
 * Calcula la mediana de un array de números
 * @param array - Array de números
 * @returns La mediana del array, o null si el array está vacío
 */
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

/**
 * Filtra valores atípicos (outliers) de un array basado en un límite de desviación estándar
 * @param array - Array de números
 * @param limite - Número de desviaciones estándar para considerar un valor como atípico (por defecto 2)
 * @returns Array sin los valores atípicos, o null si el array está vacío
 */
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
