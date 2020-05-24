import mongoose = require("mongoose");

export interface ICliente_Receptor extends mongoose.Document {
    name: string;
    direccion: string;
    telefono: string;
    id: string;
}

const Cliente_ReceptorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    id: { type: String, required: true },
}
);

export const Cliente_Receptor = mongoose.model<ICliente_Receptor>("ClienteReceptor", Cliente_ReceptorSchema);