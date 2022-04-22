const Tarea = require("./tarea");
const colors = require("../config/colors");

class Tareas {
    _listado = {};

    get getListadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        console.log();
        this.getListadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.cMain;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ?
                `${"Completada".cComplete}` :
                `${"Pendiente".cPending}`;
            console.log(`${idx}. ${desc} :: ${estado}.`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;

        this.getListadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            if (completadas) {
                if (completadoEn) {
                    const idx = `${(contador += 1)}`.cMain;
                    console.log(`${idx}. ${desc}.`);
                }
            } else {
                if (!completadoEn) {
                    const idx = `${(contador += 1)}`.cMain;
                    console.log(`${idx}. ${desc}.`);
                }
            }
        });
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.getListadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}

module.exports = Tareas;