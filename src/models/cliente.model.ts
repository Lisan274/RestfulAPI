import mongoose = require("mongoose");

export interface ICliente extends mongoose.Document { 
    name: string;
    correo: string;
    direccion: string;
    telefono: string;
    id: string;
    password: string;
}

const ClienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    correo: {type: String, required: true},
    direccion: { type: String, required: true },
    telefono: {type: String, required: true},
    id: {type: String, required: true},
    password: {type: String, required: true},
    }
);

export const Cliente = mongoose.model<ICliente>("Cliente", ClienteSchema);

