import {Request, Response} from "express";
import { Repartidor, IRepartidor } from "../models/repartidor.model";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";

export class RepartidorService{

    public getAll(req: Request,res: Response){
        Repartidor.find({},(err: Error, repartidor: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(repartidor);
        });
     
    }

    public GetAllPaquetesRepartidor(req: Request, res: Response) {  //Funcion que busca todos los repartidores con sus paquetes

        Repartidor.aggregate([{
            "$lookup": {
                from: "paquete",
                localField: "_id",
                foreignField: "repartidor",
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

    public NewOne(req: Request, res: Response) {
        const p = new Repartidor(req.body);
        p.save((err: Error, repartidor: IRepartidor) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(repartidor ? { "successed": true, "Repartidor": repartidor } : { "successed": false });
        });
    } 

    public GetPaquetesByIdRepartidor(req: Request, res: Response) {                            //Revisar bien y realizar cambios
        Paquete.find().populate("repartidor").exec((err: Error, paquete: IPaquete) => {
            if (err) {
                res.status(401).json(err);
            } else {
                res.status(200).json(paquete);
            }

        });
    }

    public GetRepartidor(req:Request,res:Response){
        Repartidor.findById(req.params.id).populate("repartidor").exec((err:Error,repartidor:IRepartidor)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(repartidor);
            }
                
        });
    }
    
    public Update(req: Request,res: Response){
        console.log("entro");
        Repartidor.findByIdAndUpdate(req.params.id,req.body,(err:Error, repartidor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( repartidor? {"updated":true} : {"updated":false} );
        })
    }
 
}

