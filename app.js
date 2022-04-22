const {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput,
    inquirerListadoTareasBorrar,
    inquirerConfirmar,
    inquirerListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

const main = async() => {
    let opt = "";
    const tareas = new Tareas();

    // Leer y cargar DB
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                // 1. Crear tarea.
                const desc = await inquirerLeerInput("Descripción: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                // 2. Listar tareas.
                tareas.listadoCompleto();
                break;
            case "3":
                // 3. Listar tareas completadas.
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                // 4. Listar tareas pendientes.
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                // 5.  Completar tarea(s).
                const ids = await inquirerListadoCheckList(tareas.getListadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                // 6.  Borrar tarea.
                const id = await inquirerListadoTareasBorrar(tareas.getListadoArr);
                if (id !== "0") {
                    const resp = await inquirerConfirmar(
                        "¿Está seguro que desea borrar?"
                    );
                    resp ? tareas.borrarTarea(id) : null;
                }
                break;
        }
        guardarDB(tareas.getListadoArr);

        // Salir
        if (opt !== "7") await inquirerPausa();
    } while (opt !== "7");
    console.log("\nGracias por usar la aplicación 🙂");
};

main();