import { Request, Response } from "express";
import { Cliente_Receptor, ICliente_Receptor } from "../models/cliente_receptor.model";
import { Paquete, IPaquete } from "../models/paquete.model";
import { PaqueteService } from "./paquete.service"
import { MongooseDocument } from "mongoose";
import { resolve } from "dns";
import { json } from "body-parser";


class ClienteHelpers {

    GetCliente_receptor(id_clie: string): Promise<ICliente_Receptor> {        //obtener el objeto cliente, consulta al cluste por eso es una promesa
        return new Promise<ICliente_Receptor>((resolve) => {        // la promesa retorna un cliente
            Cliente_Receptor.findById(id_clie, (err: Error, cliente_receptor: ICliente_Receptor) => {
                if (err) {
                    console.log(err);
                }
                resolve(cliente_receptor);
            });
        });
    }

    NumberOfPaquetesBySupplier(cliente_receptor: ICliente_Receptor): Promise<number> {        //comprobar cuantos paquetes tiene 
        return new Promise<number>(resolve => {
            Paquete.aggregate([
                { "$match": { "ClienteReceptor": cliente_receptor.id } }
            ], (err: Error, data: any) => {
                resolve(data.length);
            })
        });
    }
}

export class Cliente_ReceptorService extends ClienteHelpers {

    public getAll(req: Request, res: Response) {
        Cliente_Receptor.find({}, (err: Error, cliente: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });

    }

    public async GetById(req: Request, res: Response) {
        const my_clie = await super.GetCliente_receptor(req.params.id_clie);
        res.status(200).send(my_clie);
    }
    /*
    
        public async ClienteLog(req: Request, res: Response){
            let {correo, password} = req.body;
            const p = await Cliente.find({ correo: correo});
                if(p){
                    if(password){
                        res.status(200).json( {"mensaje": "Login correcto"});
                        console.log("Login");
                    } else
                    res.status(401).json({"mensaje": "Contraseña incorrecta"});
                } else{
                res.status(401).json( {"mensaje": "Usuria no encontrado"} );
            }
        }
    */

    public Update(req: Request, res: Response) {
        console.log("entro");
        Cliente_Receptor.findByIdAndUpdate(req.params.id_clie, req.body, (err: Error, cliente: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente ? { "updated": true } : { "updated": false });
        })
    }

    public async Delete(req: Request, res: Response) {

        const cliente = await super.GetCliente_receptor(req.params.id);
        const npaquetes: number = cliente ? await super.NumberOfPaquetesBySupplier(cliente) : 0;

        if (npaquetes > 0) {
            res.status(200).json({ "deleted": false, "message": `El cliente ${req.params.id} tiene ${npaquetes} paquetes` });
        } else {
            if (cliente == undefined) {
                res.status(200).json({ "deleted": false, "message": `El cliente ${req.params.id} No existe` });
            } else {
                Cliente_Receptor.findByIdAndDelete(req.params.id, req.body, (err: Error, cliente: any) => {
                    if (err) {
                        res.status(401).send(err);
                    }
                    res.status(200).json(cliente ? { "deleted": true, "message": "Sin error" } : { "deleted": false, "message": "Un error ocurrio con el server, vuela a intentar" });
                });
            }
        }
    }

    public NewOne(req: Request, res: Response) {
        const p = new Cliente_Receptor(req.body);
        p.save((err: Error, cliente_receptor: ICliente_Receptor) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente_receptor ? { "successed": true, "Cliente": cliente_receptor } : { "successed": false });
        });
    }

    public GetAllPaquetesCliente(req: Request, res: Response) {  //Funcion que busca todos los clientes con sus paquetes

        Cliente_Receptor.aggregate([{
            "$lookup": {
                from: "paquete",
                localField: "_id",
                foreignField: "cliente",
                as: "paquetes"
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

