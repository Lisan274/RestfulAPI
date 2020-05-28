import mongoose = require("mongoose");
<<<<<<< HEAD
import {ICliente} from "./cliente.model"
import {ICliente_Receptor} from "./cliente_receptor.model"
=======
>>>>>>> Lisandro
import {IRepartidor} from "./repartidor.model"
import { ITipoCliente } from "./tipoCliente.model";

export interface IPaquete extends mongoose.Document { 
    name: string;
    peso: number;
    tipo_paquete: number;
    estado_envio: Boolean;
<<<<<<< HEAD
    cliente: ICliente;
    cliente_receptor: ICliente_Receptor;
=======
    clienteEmisor: ITipoCliente;
    clienteReceptor: ITipoCliente;
>>>>>>> Lisandro
    repartidor: IRepartidor;
}

const PaqueteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    peso: {type: Number, required: true},
    tipo_paquete: {type: Number, required: true},
<<<<<<< HEAD
    direccion: {type: String, required: true},
    estado_envio: {type: Boolean, required: true},
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true},
    cliente_receptor: { type: mongoose.Schema.Types.ObjectId, ref: "ClienteReceptor", required:true},
    repartidor: { type: mongoose.Schema.Types.ObjectId, ref: "Repartidor", required: true}
=======
    estado_envio: {type: Boolean, required: false},
    clienteEmisor: { type: mongoose.Schema.Types.ObjectId, ref: "clienteEmisor" },
    clienteReceptor: { type: mongoose.Schema.Types.ObjectId, ref: "clienteReceptor" },
    repartidor: { type: mongoose.Schema.Types.ObjectId, ref: "repartidor" }
>>>>>>> Lisandro
});


export const Paquete = mongoose.model<IPaquete>("Paquete", PaqueteSchema);