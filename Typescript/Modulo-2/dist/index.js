import { generarReporte } from "./domain/reporte.js";
import { obtenerRecurso, obtenerRecursoDirecto, } from "./services/api-client.js";
console.log("=== Laboratorio Práctico 2: Arquitectura de Acceso a Datos ===\n");
// ==================== PARTE 1: Modelado del Dominio ====================
console.log("--- Parte 1: Modelado del Dominio ---");
// Simulación de una matrícula activa
const matriculaActiva = {
    tipo: "ACTIVA",
    asignaturas: [
        {
            id: 101,
            nombre: "Estructuras de Datos",
            codigo: "CS-201",
            creditos: 4,
            profesor: "Dr. Carlos Ruiz",
        },
    ],
    fechaMatricula: new Date("2024-01-15"),
};
console.log(generarReporte(matriculaActiva));
// Simulación de una matrícula suspendida
const matriculaSuspendida = {
    tipo: "SUSPENDIDA",
    motivo: "Falta de pago de aranceles",
    fechaSuspension: new Date("2024-04-10"),
};
console.log(generarReporte(matriculaSuspendida));
// Simulación de una matrícula finalizada
const matriculaFinalizada = {
    tipo: "FINALIZADA",
    notaMedia: 4.2,
    fechaFinalización: new Date("2024-12-15"),
};
console.log(generarReporte(matriculaFinalizada));
console.log();
// ==================== PARTE 2: Servicio de Datos Genérico ====================
console.log("--- Parte 2: Servicio de Datos Genérico ---");
async function demostrarServicios() {
    // Test 1: Obtener un estudiante
    console.log("Obteniendo estudiante con obtenerRecurso...");
    const respuestaEstudiante = await obtenerRecurso("/estudiantes/1");
    if (respuestaEstudiante.success && respuestaEstudiante.data) {
        const estudiante = respuestaEstudiante.data;
        console.log(`✓ Estudiante: ${estudiante.nombre} (${estudiante.correo})`);
    }
    else {
        console.log(`✗ Error: ${respuestaEstudiante.error}`);
    }
    console.log();
    // Test 2: Obtener una asignatura con método directo
    console.log("Obteniendo asignatura con obtenerRecursoDirecto...");
    try {
        const asignatura = await obtenerRecursoDirecto("/asignaturas/101");
        console.log(`✓ Asignatura: ${asignatura.nombre} (${asignatura.codigo})`);
    }
    catch (error) {
        console.log(`✗ Error: ${error.message}`);
    }
    console.log();
    // Test 3: Recurso no existente
    console.log("Intentando obtener un recurso que no existe...");
    const respuestaInexistente = await obtenerRecurso("/estudiantes/999");
    if (!respuestaInexistente.success) {
        console.log(`✓ Error capturado correctamente: ${respuestaInexistente.error}`);
    }
    console.log();
    // Test 4: Demostración de tipado genérico fuerte
    console.log("--- Test de Tipado Genérico ---");
    const respuestaEstudiante2 = await obtenerRecurso("/estudiantes/2");
    if (respuestaEstudiante2.success && respuestaEstudiante2.data) {
        // TypeScript sabe que data es de tipo Estudiante
        const { nombre, carrera, semestre } = respuestaEstudiante2.data;
        console.log(`Estudiante: ${nombre}, Carrera: ${carrera}, Semestre: ${semestre}`);
    }
    console.log("\n✓ Todos los tests completados exitosamente");
}
// Ejecutar las demostraciones
demostrarServicios().catch((error) => console.error(error));
