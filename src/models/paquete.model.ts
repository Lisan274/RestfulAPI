import mongoose = require("mongoose");
import {IRepartidor} from "./repartidor.model"
import { ITipoCliente } from "./tipoCliente.model";

export interface IPaquete extends mongoose.Document { 
    name: string;
    peso: String;
    tipo_paquete: number;
    estado_envio: Boolean;
    clienteEmisor: ITipoCliente;
    clienteReceptor: ITipoCliente;
    repartidor: IRepartidor;
}

const PaqueteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    peso: {type: String, required: true},
    tipo_paquete: {type: Number, required: true},
    estado_envio: {type: Boolean, required: false},
    clienteEmisor: { type: mongoose.Schema.Types.ObjectId, ref: "clienteEmisor" },
    clienteReceptor: { type: mongoose.Schema.Types.ObjectId, ref: "clienteReceptor" },
    repartidor: { type: mongoose.Schema.Types.ObjectId, ref: "repartidor" }
});


export const Paquete = mongoose.model<IPaquete>("Paquete", PaqueteSchema);