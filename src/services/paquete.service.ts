import {Request, Response} from "express";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";
import { Cliente, ICliente } from "../models/cliente.model";

export class PaqueteService{

    public getAll(req: Request,res: Response){
        Paquete.find({},(err: Error, cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });
    }

    public GetById(req: Request, res: Response){
        Paquete.findById(req.params.id,(err:Error, cliente: MongooseDocument)=>{
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente? cliente : {});
        });
    }

    public Update(req: Request, res: Response){
        Paquete.findByIdAndUpdate(req.params.id, req.body, (err:Error, cliente:any)=>{
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente? { "updated": true } : { "updated": false });
        })
        
    }

    public Delete(req: Request, res: Response){
        Paquete.findByIdAndDelete(req.params.id, req.body, (err: Error, cliente: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(cliente ? { "deleted": true } : { "deleted": false });
        })
    }

    public NewOne(req: Request, res: Response){
        const p = new Paquete(req.body);
        p.save((err:Error, paquete: IPaquete)=>{
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete ? { "successed": true, "Paquete": paquete } : { "successed": false });
        })
    }

}