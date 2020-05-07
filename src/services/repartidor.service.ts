import {Request, Response} from "express";
import { Repartidor } from "../models/repartidor.model";
import { MongooseDocument } from "mongoose";

export class RepartidorService{

    public getAll(req: Request,res: Response){
        Repartidor.find({},(err: Error, cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });
     
    }
}