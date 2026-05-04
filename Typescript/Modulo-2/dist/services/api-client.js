/**
 * Base de datos simulada con datos mock.
 */
const mockDatabase = {
    "/estudiantes/1": {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan@universidad.edu",
        carrera: "Ingeniería Informática",
        semestre: 4,
    },
    "/estudiantes/2": {
        id: 2,
        nombre: "María López",
        correo: "maria@universidad.edu",
        carrera: "Administración",
        semestre: 3,
    },
    "/asignaturas/101": {
        id: 101,
        nombre: "Estructuras de Datos",
        codigo: "CS-201",
        creditos: 4,
        profesor: "Dr. Carlos Ruiz",
    },
    "/asignaturas/102": {
        id: 102,
        nombre: "Bases de Datos",
        codigo: "CS-301",
        creditos: 3,
        profesor: "Dra. Ana García",
    },
};
/**
 * Simula una llamada a una base de datos.
 * Retorna una promesa con datos tipados fuertemente.
 *
 * @param endpoint - El endpoint a consultar
 * @param delayMs - Tiempo de espera en milisegundos (simula latencia)
 * @returns Una promesa que se resuelve con la respuesta tipada
 *
 * @example
 * const estudiante = await obtenerRecurso<Estudiante>("/estudiantes/1");
 */
export async function obtenerRecurso(endpoint, delayMs = 500) {
    // Simula latencia de red
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    // Simula búsqueda en la BD
    const data = mockDatabase[endpoint];
    if (data !== undefined) {
        return {
            success: true,
            data: data,
            timestamp: new Date(),
        };
    }
    return {
        success: false,
        error: `Recurso no encontrado: ${endpoint}`,
        timestamp: new Date(),
    };
}
/**
 * Variación del método genérico que retorna directamente el dato
 * (sin el objeto RespuestaAPI). Lanza error si falla.
 *
 * @param endpoint - El endpoint a consultar
 * @returns Una promesa que se resuelve con el dato tipado
 * @throws Error si el recurso no se encuentra
 */
export async function obtenerRecursoDirecto(endpoint) {
    const respuesta = await obtenerRecurso(endpoint);
    if (!respuesta.success || respuesta.data === undefined) {
        throw new Error(respuesta.error || "Error desconocido");
    }
    return respuesta.data;
}
