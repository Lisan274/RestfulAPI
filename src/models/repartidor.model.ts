import mongoose = require("mongoose");
import { IPaquete } from "./paquete.model";

export interface IRepartidor extends mongoose.Document { 
    name: string;
    direccion: string;
    correo: string;
    telefono: string;
    paquete: IPaquete;
}

const RepartidorSchema = new mongoose.Schema({

    name: { type: String, required: true },
    correo: {type: String, required: true},
    direccion: { type: String, required: true },
    telefono: {type: String, required: true},
    paquete: { type: mongoose.Schema.Types.ObjectId, ref: "Paquete" }
});

export const Repartidor = mongoose.model<IRepartidor>("Repartidor", RepartidorSchema);