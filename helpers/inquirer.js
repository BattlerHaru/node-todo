const inquirer = require("inquirer");
const colors = require("../config/colors");

const questionsForInquirerMenu = [{
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices: [{
            value: "1",
            name: `${"1.".cMain} ${"Crear tarea.".cText}`,
        },
        {
            value: "2",
            name: `${"2.".cMain} ${"Listar tareas.".cText}`,
        },
        {
            value: "3",
            name: `${"3.".cMain} ${"Listar tareas completadas.".cText}`,
        },
        {
            value: "4",
            name: `${"4.".cMain} ${"Listar tareas pendientes.".cText}`,
        },
        {
            value: "5",
            name: `${"5.".cMain} ${"Completar tarea(s).".cText}`,
        },
        {
            value: "6",
            name: `${"6.".cMain} ${"Borrar tarea.".cText}`,
        },
        {
            value: "7",
            name: `${"7.".cMain} ${"Salir.".cText}`,
        },
    ],
}, ];

const inquirerMenu = async() => {
    // console.clear();
    process.stdout.write("\033c");

    console.log("============================".cMain);
    console.log("  Seleccione una opción".cText);
    console.log("============================\n".cMain);

    const { opt } = await inquirer.prompt(questionsForInquirerMenu);

    return opt;
};

const inquirerPausa = async() => {
    const question = [{
        type: "input",
        name: "input",
        message: `Presione ${"ENTER".cMain} para continuar`,
    }, ];
    console.log("\n");
    await inquirer.prompt(question);
};

const inquirerLeerInput = async(msg) => {
    const question = [{
        type: "input",
        name: "desc",
        message: msg,
        validate(value) {
            if (value.length === 0) {
                return `${"Por favor ingrese un valor.".cWarning}`;
            }
            return true;
        },
    }, ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const inquirerListadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.cMain;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
        };
    });

    choices.unshift({
        value: "0",
        name: `${"0.".cMain} Cancelar. \n`,
    });

    const question = [{
        type: "list",
        name: "id",
        message: "Borrar:",
        choices,
    }, ];

    const { id } = await inquirer.prompt(question);
    return id;
};

const inquirerConfirmar = async(msg) => {
    const question = [{
        type: "confirm",
        name: "ok",
        message: msg,
    }, ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const inquirerListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.cMain;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false,
        };
    });

    const question = [{
        type: "checkbox",
        name: "ids",
        message: "Selecciones: \n",
        choices,
    }, ];

    const { ids } = await inquirer.prompt(question);
    return ids;
};

module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput,
    inquirerListadoTareasBorrar,
    inquirerConfirmar,
    inquirerListadoCheckList,
};