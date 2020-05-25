import mongoose = require("mongoose");
import {ICliente} from "./cliente.model"

export interface ITipoCliente extends mongoose.Document { 
    clienteEmisor: ICliente;
    clienteReceptor: ICliente;
}

const TipoClienteSchema = new mongoose.Schema({
    clienteEmisor: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
    clienteReceptor: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" }
   
    }
);

export const Cliente = mongoose.model<ITipoCliente>("Cliente", TipoClienteSchema);
