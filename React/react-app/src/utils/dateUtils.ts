import { differenceInDays, isValid, parseISO } from 'date-fns';

/**
 * Calcula la diferencia en días entre dos fechas usando date-fns
 * 
 * Tipos estrictos:
 * - Entrada: Date | string (ISO format)
 * - Salida: number (días)
 * - Valida que las fechas sean correctas antes de calcular
 * 
 * @param startDate - Fecha de inicio (Date o string ISO)
 * @param endDate - Fecha final (Date o string ISO)
 * @returns Diferencia en días (puede ser negativo si startDate > endDate)
 * @throws Error si alguna de las fechas es inválida
 * 
 * @example
 * const diff = calculateDaysDifference(new Date('2024-01-01'), new Date('2024-01-31'));
 * console.log(diff); // 30
 * 
 * const diff2 = calculateDaysDifference('2024-01-01', '2024-01-31');
 * console.log(diff2); // 30
 */
export function calculateDaysDifference(
  startDate: Date | string,
  endDate: Date | string
): number {
  // Convertir strings a Date si es necesario
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

  // Validar que ambas fechas sean válidas
  if (!isValid(start)) {
    throw new Error(`Fecha de inicio inválida: ${startDate}`);
  }

  if (!isValid(end)) {
    throw new Error(`Fecha final inválida: ${endDate}`);
  }

  // Calcular y retornar la diferencia en días
  return differenceInDays(end, start);
}

/**
 * Calcula la edad en años basada en la fecha de nacimiento
 * 
 * @param birthDate - Fecha de nacimiento
 * @returns Edad en años
 * @throws Error si la fecha de nacimiento es inválida o en el futuro
 * 
 * @example
 * const age = calculateAge(new Date('1990-05-15'));
 * console.log(age); // aproximadamente 34 (en 2024)
 */
export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  
  if (!isValid(birth)) {
    throw new Error(`Fecha de nacimiento inválida: ${birthDate}`);
  }

  const today = new Date();
  if (birth > today) {
    throw new Error('La fecha de nacimiento no puede ser en el futuro');
  }

  return differenceInDays(today, birth) / 365.25;
}

/**
 * Calcula la diferencia en diferentes unidades de tiempo
 * 
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha final
 * @param unit - Unidad: 'days', 'weeks', 'months', 'years'
 * @returns Diferencia en la unidad especificada
 * 
 * @example
 * const weeks = calculateDifference(startDate, endDate, 'weeks');
 * const months = calculateDifference(startDate, endDate, 'months');
 */
export function calculateDifference(
  startDate: Date | string,
  endDate: Date | string,
  unit: 'days' | 'weeks' | 'months' | 'years' = 'days'
): number {
  const days = calculateDaysDifference(startDate, endDate);

  switch (unit) {
    case 'days':
      return days;
    case 'weeks':
      return Math.floor(days / 7);
    case 'months':
      return Math.floor(days / 30.44); // Promedio de días por mes
    case 'years':
      return Math.floor(days / 365.25);
    default:
      const _exhaustive: never = unit;
      return _exhaustive;
  }
}
