import type { EstadoMatricula } from "./types/entities.js";

/**
 * Genera un reporte descriptivo basado en el estado de la matrícula.
 * Utiliza un switch con type narrowing para evaluar el tipo discriminado.
 *
 * @param estado - El estado de matrícula a evaluar
 * @returns Un string descriptivo del estado
 */
export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return `Matrícula ACTIVA. Estudiante inscrito en ${estado.asignaturas.length} asignatura(s). Fecha: ${estado.fechaMatricula.toLocaleDateString()}`;

    case "SUSPENDIDA":
      return `Matrícula SUSPENDIDA. Motivo: ${estado.motivo}. Fecha de suspensión: ${estado.fechaSuspension.toLocaleDateString()}`;

    case "FINALIZADA":
      return `Matrícula FINALIZADA. Nota Media: ${estado.notaMedia.toFixed(2)}/5.0. Fecha de finalización: ${estado.fechaFinalización.toLocaleDateString()}`;

    default:
      // Esta línea nunca se alcanzará si todos los casos están cubiertos
      const _exhaustiveCheck: never = estado;
      return _exhaustiveCheck;
  }
}
