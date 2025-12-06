import { PRIORIDAD, ESTADO } from "../lib/constantes";
import { fechaToString } from "../lib/funciones";
import { v4 as uuidv4 } from 'uuid';

export class Tarea {
    private _id: string = '';
    private _titulo: string;
    private _descripcion: string;
    private _prioridad: string;
    private _estado: string;
    private _fechaCreacion: Date;
    private _fechaVencimiento: Date;
    private _fechaUltimaEdicion: Date;
    private _dificultad: number;

    
    //Constructor de la tarea.
    constructor(
        _titulo: string,
        _descripcion: string,
        _prioridad: typeof PRIORIDAD[number],
        _estado: typeof ESTADO[number],
        _fechaCreacion: Date | null,
        _fechaVencimiento: Date,
        _fechaUltimaEdicion: Date | null,
        id?: string,
        dificultad?: number
    ) {
        const day: Date = new Date();

        // Validaciones básicas
        if (!(_titulo && _titulo.trim().length > 0)) {
            throw new Error('El título de la tarea no puede estar vacío.');
        }
        if (!PRIORIDAD.includes(_prioridad)) {
            throw new Error(`Prioridad inválida: ${_prioridad}`);
        }
        if (!ESTADO.includes(_estado)) {
            throw new Error(`Estado inválido: ${_estado}`);
        }
        if (!(_fechaVencimiento instanceof Date) || isNaN(_fechaVencimiento.getTime())) {
            throw new Error('Fecha de vencimiento inválida.');
        }

        this._titulo = _titulo.trim();
        this._descripcion = _descripcion ?? '';
        this._prioridad = _prioridad;
        this._estado = _estado;

        // Asignar id
        if (id && id.trim() !== '') {
            this._id = id.trim();
        } else {
            this._id = uuidv4();
        }

        // Fecha de creación
        if (_fechaCreacion === null) {
            this._fechaCreacion = new Date(
                fechaToString(
                    day.getFullYear().toString(),
                    (day.getMonth() + 1).toString(),
                    day.getDate().toString()
                ) + "T03:00:00Z"
            );
        } else {
            this._fechaCreacion = new Date(_fechaCreacion);
        }

        this._fechaVencimiento = new Date(_fechaVencimiento);

        // Fecha última edición
        if (_fechaUltimaEdicion === null) {
            this._fechaUltimaEdicion = new Date(
                fechaToString(
                    day.getFullYear().toString(),
                    (day.getMonth() + 1).toString(),
                    day.getDate().toString()
                ) + "T03:00:00Z"
            );
        } else {
            this._fechaUltimaEdicion = new Date(_fechaUltimaEdicion);
        }

        // Dificultad: valor numérico (por ejemplo 1-5)
        if (typeof dificultad === 'number' && !isNaN(dificultad)) {
            this._dificultad = Math.min(5, Math.max(1, Math.floor(dificultad)));
        } else {
            this._dificultad = 3;
        }
    }

    // ----------------------------------------- Setters -----------------------------------------

    //Establece el id 
    setId(id: string): void { if (id && id.trim()) this._id = id.trim(); }

    // Establece el título (no vacío)
    setTitulo(titulo: string): void {
        if (!titulo || titulo.trim() === '') throw new Error('Título inválido');
        this._titulo = titulo.trim();
    }

    // Establece la descripción
    setDescripcion(descripcion: string): void { this._descripcion = descripcion ?? ''; }

    // Establece la prioridad solo si es válida 
    setPrioridad(prioridad: typeof PRIORIDAD[number]): void {
        if (!PRIORIDAD.includes(prioridad)) throw new Error('Prioridad inválida');
        this._prioridad = prioridad;
    }

    // Establece el estado solo si es válido
    setEstado(estado: typeof ESTADO[number]): void {
        if (!ESTADO.includes(estado)) throw new Error('Estado inválido');
        this._estado = estado;
    }

    // Establece la fecha de vencimiento si es una Date válida
    setFechaVencimiento(fechaVencimiento: Date): void {
        if (!(fechaVencimiento instanceof Date) || isNaN(fechaVencimiento.getTime())) throw new Error('Fecha de vencimiento inválida');
        this._fechaVencimiento = fechaVencimiento;
    }

    // Establece la fecha de última edición
    setFechaUltimaEdicion(fechaUltimaEdicion: Date): void {
        if (!(fechaUltimaEdicion instanceof Date) || isNaN(fechaUltimaEdicion.getTime())) throw new Error('Fecha inválida');
        this._fechaUltimaEdicion = fechaUltimaEdicion;
    }

    // Establece la dificultad (1-5)
    setDificultad(dificultad: number): void {
        if (typeof dificultad !== 'number' || isNaN(dificultad)) throw new Error('Dificultad inválida');
        this._dificultad = Math.min(5, Math.max(1, Math.floor(dificultad)));
    }

    // ----------------------------------------- Getters -----------------------------------------

    getId(): string { return this._id; }
    getTitulo(): string { return this._titulo; }
    getDescripcion(): string { return this._descripcion; }
    getPrioridad(): typeof PRIORIDAD[number] { return this._prioridad; }
    getEstado(): typeof ESTADO[number] { return this._estado; }
    getFechaCreacion(): Date { return this._fechaCreacion; }
    getFechaVencimiento(): Date { return this._fechaVencimiento; }
    getFechaUltimaEdicion(): Date { return this._fechaUltimaEdicion; }
    getDificultad(): number { return this._dificultad; }

}

