// Esto solo era una demostración de la forma tradicional: stdin | stdout
// Se utilizara ahora el archivo inquirer de esta misma carpeta

const colors = require("../config/colors");

const mostrarMenu = () => {
    return new Promise((resolve, reject) => {
        // console.clear();
        process.stdout.write("\033c");

        console.log("============================".cMain);
        console.log("  Seleccione una opción".cMain);
        console.log("============================\n".cMain);

        console.log(`${"1.".cMain} Crear tarea.`);
        console.log(`${"2.".cMain} Listar tareas.`);
        console.log(`${"3.".cMain} Listar tareas completadas.`);
        console.log(`${"4.".cMain} Listar tareas pendientes.`);
        console.log(`${"5.".cMain} Completar tarea(s).`);
        console.log(`${"6.".cMain} Borrar tarea.`);

        console.log(`${"0.".cMain} Salir.\n`);

        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question("Seleccione una opción: ", (opt) => {
            readline.close();
            resolve(opt);
        });
    });
};

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`\nPresione ${"ENTER".cMain} para continuar\n`, () => {
            readline.close();
            resolve();
        });
    });
};

module.exports = {
    mostrarMenu,
    pausa,
};