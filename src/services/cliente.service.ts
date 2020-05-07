import {Request, Response} from "express";
import { Cliente, ICliente } from "../models/cliente.model";
import { MongooseDocument } from "mongoose";

export class ClienteService{

    public getAll(req: Request,res: Response){
        Cliente.find({},(err: Error, cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });
     
    }

    public NewOne(req: Request, res: Response){
        const p = new Cliente(req.body);
        p.save((err:Error, proveedor: ICliente)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"successed":true, "Proveedor": proveedor } : {"successed":false} );
        });
    } 

    //public async GetById(req: Request,res: Response){        
       // const my_prov = await super.GetCliente(req.params.id_prov);
        //res.status(200).send(my_prov);
    //}

}