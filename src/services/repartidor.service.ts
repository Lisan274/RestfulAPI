import { Request, Response } from "express";
import { Repartidor, IRepartidor } from "../models/repartidor.model";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";

class RepartidorHelpers {


    /*GetRepartidor(filter: any): Promise<IRepartidor> {
        return new Promise<IRepartidor>((resolve) => {
            Repartidor.find(filter, (err: Error, repartidor: IRepartidor) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(repartidor);
                }
            });
        });
    }*/

    GetRepartidor(id_rep: string): Promise<IRepartidor> {        //obtener el objeto cliente, consulta al cluste por eso es una promesa
        return new Promise<IRepartidor>((resolve) => {        // la promesa retorna un cliente
            Repartidor.findById(id_rep, (err: Error, repartidor: IRepartidor) => {
                if (err) {
                    console.log(err);
                }
                resolve(repartidor);
            });
        });
    }


    NumberOfPaquetesBySupplier(rep: IRepartidor): Promise<number> {        //comprobar cuantos paquetes tiene el repartidor
        return new Promise<number>(resolve => {
            Paquete.aggregate([
                { "$match": { "repartidor": rep._id } }
            ], (err: Error, data: any) => {
                resolve(data.length);
            })
        });
    }
}

export class RepartidorService extends RepartidorHelpers {

    public async GetById(req: Request, res: Response) {
        const my_rep = await super.GetRepartidor(req.params.id_rep);
        res.status(200).send(my_rep);
    }

    public Update(req: Request, res: Response) {
        console.log("entro");
        Repartidor.findByIdAndUpdate(req.params.id, req.body, (err: Error, repartidor: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(repartidor ? { "updated": true } : { "updated": false });
        })
    }

    public getAll(req: Request, res: Response) { //En el caso de que el administrador quiera ver todos los Repartidores
        Repartidor.find({}, (err: Error, repartidor: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(repartidor);
        });

    }

    public async Delete(req: Request, res: Response) {

        const Rep = await super.GetRepartidor(req.params.id_rep);
        const npaquetes: number = Rep ? await super.NumberOfPaquetesBySupplier(Rep) : 0;

        if (npaquetes > 0) {
            res.status(200).json({ "deleted": false, "message": `El repartidor ${req.params.id_rep} tiene ${npaquetes} paquetes` });
        } else {
            if (Rep == undefined) {
                res.status(200).json({ "deleted": false, "message": `El repartidor ${req.params.id_rep} No existe` });
            } else {
                Repartidor.findByIdAndDelete(req.params.id_rep, req.body, (err: Error, repartidor: any) => {
                    if (err) {
                        res.status(401).send(err);
                    }
                    res.status(200).json(repartidor ? { "deleted": true, "message": "Sin error" } : { "deleted": false, "message": "Un error ocurrio con el server, vuela a intentar" });
                });
            }
        }
    }

    public Login(req: Request, res: Response) {
        console.log("Login");
        Repartidor.findById(req.params.correo, req.params.password, req.body, (err: Error, repartidor: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(repartidor ? { "repartidor": true } : { "repartidor": false });
        })
    }


    public NewOne(req: Request, res: Response) {
        Repartidor.find({ correo: req.body.correo }, function (err, docs) {
            if (docs.length > 0) {
                res.status(401).send("Este usuario ya esta registrado");
            } else {
                const p = new Repartidor(req.body);
                p.save((err: Error, repartidor: IRepartidor) => {
                    if (err) {
                        res.status(401).send(err);
                    }
                    res.status(200).json(repartidor ? { "successed": true, "Repartidor": repartidor } : { "successed": false });
                });
            }
        });

    }

    public getAllWPackage(req: Request, res: Response) {

        Repartidor.aggregate([{
            "$lookup": {
                from: "paquetes",
                localField: "_id",
                foreignField: "repartidor",
                as: "l"
            }
        }], (err: Error, data: any) => {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).json(data);
            }
        })

    }


}
