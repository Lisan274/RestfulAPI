import {Request, Response, query} from "express";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";
import { url } from "inspector";

export class PaqueteService{


    public GetPaquete(req:Request,res:Response){
        Paquete.findById(req.params.id).populate("cliente").exec((err:Error,paquete:IPaquete)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(paquete);
            }
                
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

    public Update(req: Request, res: Response) {
        Paquete.findByIdAndUpdate(req.params.id, req.body, (err: Error, paquete: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete ? { "updated": true } : { "updated": false });
        })

    }

    public Delete(req: Request, res: Response) {
        Paquete.findByIdAndDelete(req.params.id, req.body, (err: Error, paquete: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete ? { "deleted": true } : { "deleted": false });
        })
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

    public Gettype_1(req: Request, res: Response){
        Paquete.find({tipo_paquete:1}, (err: Error, paquete: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });

    }

    public Gettype_2(req: Request, res: Response) {
        Paquete.find({ tipo_paquete: 2 }, (err: Error, paquete: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });

    }
    
    public Gettype_3(req: Request, res: Response) {
        Paquete.find({ tipo_paquete: 3 }, (err: Error, paquete: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(paquete);
        });

    }
}