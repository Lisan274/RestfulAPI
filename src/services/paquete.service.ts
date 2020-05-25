import {Request, Response} from "express";
import { Paquete, IPaquete } from "../models/paquete.model";
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


export class PaqueteService extends PaqueteHelpers{

    public GetPaqueteId(req: Request,res: Response){
        if (!req.params.id){
            res.status(401).send({data: "error"});
        }
        let ObjectId = require('mongoose').Types.ObjectId;
        Paquete.aggregate([
            { "$match": {"_id": ObjectId(req.params.id)} },
            {
                "$lookup":{
                    from: "clientes",
                    localField:"clienteEmisor",
                    foreignField:"_id",
                    as: "clienteEmisor"
                }
            },
            { $unwind:"$clienteEmisor"},{
                "$lookup":{
                    from: "clientes",
                    localField:"clienteReceptor",
                    foreignField:"_id",
                    as: "clienteReceptor"
                }
            },
            { $unwind:"$clienteReceptor"},
        ], (err: Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }    
        })

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

    public NewOne(req: Request, res: Response) {
        const p = new Paquete(req.body);
        p.save((err: Error, paquete: IPaquete) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete ? { "successed": true, "Paquete": paquete } : { "successed": false });
        })
    }


    public GetTipoPaquete (req: Request, res: Response) {
        if (!req.params.n){
            res.status(401).send({data: "error"});
        }
        Paquete.find({tipo_paquete: parseInt(req.params.n)}, (err: Error, paquete: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });
     
    }

}
    