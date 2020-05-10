import {Request, Response} from "express";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";


export class PaqueteService{


    public GetPaquete(req:Request,res:Response){
        Paquete.findById(req.params.id_paq).populate("cliente").exec((err:Error,paquete:IPaquete)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(paquete);
            }
                
        });
    }

    public Delete(req: Request, res: Response){
        Paquete.findByIdAndDelete(req.params.id_paq,req.body,(err:Error, cliente:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"deleted":true} : {"deleted":false} );
        });
    }

    public getAll(req: Request,res: Response){
        Paquete.find({},(err: Error, paquete: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });
     
    }
}
    