/**
 * Interfaz que representa a un estudiante del sistema universitario.
 * Usa readonly para el ID para garantizar inmutabilidad.
 */
export interface Estudiante {
  readonly id: number;
  nombre: string;
  correo: string;
  carrera: string;
  semestre: number;
}

/**
 * Interfaz que representa una asignatura ofrecida en la universidad.
 * Usa readonly para el ID para garantizar inmutabilidad.
 */
export interface Asignatura {
  readonly id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  profesor: string;
}

/**
 * Interfaz para representar una matrícula activa.
 * Discriminador: tipo = "ACTIVA"
 */
export interface MatriculaActiva {
  readonly tipo: "ACTIVA";
  asignaturas: Asignatura[];
  fechaMatricula: Date;
}

/**
 * Interfaz para representar una matrícula suspendida.
 * Discriminador: tipo = "SUSPENDIDA"
 */
export interface MatriculaSuspendida {
  readonly tipo: "SUSPENDIDA";
  motivo: string;
  fechaSuspension: Date;
}

/**
 * Interfaz para representar una matrícula finalizada.
 * Discriminador: tipo = "FINALIZADA"
 */
export interface MatriculaFinalizada {
  readonly tipo: "FINALIZADA";
  notaMedia: number;
  fechaFinalización: Date;
}

/**
 * Unión Discriminada (Discriminated Union) de los estados posibles de una matrícula.
 * TypeScript puede hacer type narrowing basado en la propiedad 'tipo'.
 */
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
