import mongoose = require("mongoose");
import {ICliente} from "./cliente.model"
import {ICliente_Receptor} from "./cliente_receptor.model"
import {IRepartidor} from "./repartidor.model"

export interface IPaquete extends mongoose.Document { 
    name: string;
    peso: number;
    tipo_paquete: number;
    direccion: String;
    estado_envio: Boolean;
    cliente: ICliente;
    cliente_receptor: ICliente_Receptor;
    repartidor: IRepartidor;
}

const PaqueteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    peso: {type: Number, required: true},
    tipo_paquete: {type: Number, required: true},
    direccion: {type: String, required: true},
    estado_envio: {type: Boolean, required: true},
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true},
    cliente_receptor: { type: mongoose.Schema.Types.ObjectId, ref: "ClienteReceptor", required:true},
    repartidor: { type: mongoose.Schema.Types.ObjectId, ref: "Repartidor", required: true}
});


export const Paquete = mongoose.model<IPaquete>("Paquete", PaqueteSchema);