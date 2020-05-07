import {Request, Response} from "express";
import { Paquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";

export class PaqueteService{

    public getAll(req: Request,res: Response){
        Paquete.find({},(err: Error, cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });
     
    }
}