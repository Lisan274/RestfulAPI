import {Request, Response} from "express";
import { Repartidor, IRepartidor } from "../models/repartidor.model";
import { MongooseDocument } from "mongoose";

export class RepartidorService{

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
        Repartidor.findByIdAndUpdate(req.params.id_rep,req.body,(err:Error, repartidor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( repartidor? {"updated":true} : {"updated":false} );
        })
    }

    public getAll(req: Request,res: Response){ //En el caso de que el administrador quiera ver todos los Repartidores
        Repartidor.find({},(err: Error, repartidor: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(repartidor);
        });
     
    }
}

