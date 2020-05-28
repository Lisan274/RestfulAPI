import mongoose = require("mongoose");


export interface IRepartidor extends mongoose.Document { 
    name: string;
    direccion: string;
    correo: string;
    telefono: string;
    password: string;
}

const RepartidorSchema = new mongoose.Schema({

    name: { type: String, required: true },
    direccion: { type: String, required: true },
    correo: {type: String, required: true},
    telefono: {type: String, required: true},
    password: {type: String, required: true},
    
});

export const Repartidor = mongoose.model<IRepartidor>("Repartidor", RepartidorSchema);