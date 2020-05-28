import { Request, Response } from "express";
import { Paquete, IPaquete } from "../models/paquete.model";
import { Repartidor, IRepartidor } from "../models/repartidor.model";
import { Cliente, ICliente } from "../models/cliente.model";
import { ITipoCliente } from "../models/tipoCliente.model";
import { MongooseDocument } from "mongoose";

class PaqueteHelpers {

    GetPaquete(filter: any): Promise<IPaquete> {
        return new Promise<IPaquete>((resolve) => {
            Paquete.find(filter, (err: Error, paquete: IPaquete) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(paquete);
                }
            });
        });
    }

}

/*GetPaquete(id_paq: string):Promise<IPaquete>{        //obtener el objeto cliente, consulta al cluste por eso es una promesa
    return new Promise<IPaquete>( (resolve) => {        // la promesa retorna un cliente
        Paquete.findById(id_paq,(err:Error, paquete:IPaquete)=>{
            if(err){
                console.log(err);
            }
            resolve(paquete);
        }); 
    });
}
}*/


export class PaqueteService extends PaqueteHelpers {

    public GetPaqueteId(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(401).send({ data: "error" });
        }
        let ObjectId = require('mongoose').Types.ObjectId;
        Paquete.aggregate([
            { "$match": { "_id": ObjectId(req.params.id) } },
            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteEmisor",
                    foreignField: "_id",
                    as: "clienteEmisor"
                }
            },
            { $unwind: "$clienteEmisor" }, {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteReceptor",
                    foreignField: "_id",
                    as: "clienteReceptor"
                }
            },
            { $unwind: "$clienteReceptor" },
        ], (err: Error, data: any) => {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).json(data);
            }
        })

    }


    public Delete(req: Request, res: Response) {
        Paquete.findByIdAndDelete(req.params.id_paq, req.body, (err: Error, cliente: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente ? { "deleted": true } : { "deleted": false });
        });
    }

    public getAll(req: Request, res: Response) {
        Paquete.find({}, (err: Error, paquete: MongooseDocument) => {
            Paquete.aggregate([
                {
                    "$lookup": {
                        from: "clientes",
                        localField: "clienteEmisor",
                        foreignField: "_id",
                        as: "clienteEmisor"
                    }
                },
                {
                    "$lookup": {
                        from: "clientes",
                        localField: "clienteReceptor",
                        foreignField: "_id",
                        as: "clienteReceptor"
                    }
                },

            ], (err: Error, data: any) => {
                if (err) {
                    res.status(401).send(err);
                } else {
                    res.status(200).json(data);
                }
            })

        });
    }

    public NewOne(req: Request, res: Response) {
        Repartidor.find().lean().exec(function (error, repartidores) {
            if (error) {
                res.status(401).send(error);
            }
            req.body.repartidor = repartidores[Math.floor(Math.random() * repartidores.length)]._id
            const p = new Paquete(req.body);
            p.save((err: Error, paquete: IPaquete) => {
                if (err) {
                    res.status(401).send(err);
                }
                res.status(200).json(paquete ? { "successed": true, "Paquete": paquete } : { "successed": false });
            })
        });
    }

    public GetPaquetesCliente(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(401).send({ data: "error" });
        }
        let ObjectId = require('mongoose').Types.ObjectId;
        Paquete.aggregate([
            { "$match": { "clienteEmisor": ObjectId(req.params.id) } },
            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteEmisor",
                    foreignField: "_id",
                    as: "clienteEmisor"
                }
            },

            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteReceptor",
                    foreignField: "_id",
                    as: "clienteReceptor"
                }
            },

        ], (err: Error, data: any) => {
            if (err) {
                return res.status(401).send(err);
            } else {
                return res.status(200).json(data);
            }
        })

    }

    public GetPaquetesRepartidor(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(401).send({ data: "error" });
        }
        let ObjectId = require('mongoose').Types.ObjectId;
        Paquete.aggregate([
            { "$match": { "repartidor": ObjectId(req.params.id) } },
            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteEmisor",
                    foreignField: "_id",
                    as: "clienteEmisor"
                }
            },
            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteReceptor",
                    foreignField: "_id",
                    as: "clienteReceptor"
                }
            },
        ], (err: Error, data: any) => {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).json(data);
            }
        })

    }

    public GetTipoPaquete(req: Request, res: Response) {
        if (!req.params.n) {
            res.status(401).send({ data: "error" });
        }
        Paquete.find({ tipo_paquete: parseInt(req.params.n) }, (err: Error, paquete: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });

    }

    public GetType(req: Request, res: Response) { //Tuvimos que cambiar el endpoint ya que con el de arriba, 
        if (!req.params.n) {                     //Teníamos errores en el frontend
            return res.status(401).send({ data: "error" });
        }
        let ObjectId = require('mongoose').Types.ObjectId;
        Paquete.aggregate([
            { "$match": { "tipo_paquete": parseInt(req.params.n) } },
            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteEmisor",
                    foreignField: "_id",
                    as: "clienteEmisor"
                }
            },

            {
                "$lookup": {
                    from: "clientes",
                    localField: "clienteReceptor",
                    foreignField: "_id",
                    as: "clienteReceptor"
                }
            },

        ], (err: Error, data: any) => {
            if (err) {
                return res.status(401).send(err);
            } else {
                console.log("AQUI")
                return res.status(200).json(data);
            }
        })

    }

}
