import mongoose = require("mongoose");
import {ICliente} from "./cliente.model"

export interface IPaquete extends mongoose.Document { 
    name: string;
    peso: number;
    tipo_paquete: number;
    direccion: String;
    estado_envio: Boolean;
    cliente: ICliente;
}

const PaqueteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    peso: {type: Number, required: true},
    tipo_paquete: {type: Number, required: true},
    direccion: {type: String, required: true},
    estado_envio: {type: Boolean, required: true},
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" }
});


export const Paquete = mongoose.model<IPaquete>("Paquete", PaqueteSchema);