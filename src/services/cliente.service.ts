import {Request, Response} from "express";
import { Cliente, ICliente } from "../models/cliente.model";
import { Paquete, IPaquete } from "../models/paquete.model";
import { PaqueteService } from "./paquete.service"
import { MongooseDocument } from "mongoose";
import { resolve } from "dns";
import { json } from "body-parser";


class ClienteHelpers{

    GetCliente(id: string):Promise<ICliente>{        //obtener el objeto cliente, consulta al cluste por eso es una promesa
        return new Promise<ICliente>( (resolve) => {        // la promesa retorna un cliente
            Cliente.findById(id,(err:Error,cliente:ICliente)=>{
                if(err){
                    console.log(err);
                }
                resolve(cliente);
            }); 
        });
    }

    NumberOfPaquetesBySupplier(cliente: ICliente):Promise<number>{        //comprobar cuantos paquetes tiene 
        return new Promise<number>( resolve => {
            Paquete.aggregate([
                { "$match": { "cliente": cliente._id }}                
              ],(err:Error, data:any)=>{
                resolve(data.length);
              }) 
        });
    }
}

export class ClienteService extends ClienteHelpers{

    public getAll(req: Request,res: Response){
        Cliente.find({},(err: Error, cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(cliente);
        });
     
    }

   
    public async GetById(req: Request,res: Response){        
       const my_clien = await super.GetCliente(req.params._id);
       res.status(200).send(my_clien);
    }

    //Payload
    public Update(req: Request,res: Response){
        console.log("entro");
        Cliente.findByIdAndUpdate(req.params.id_prov,req.body,(err:Error, cliente:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"updated":true} : {"updated":false} );
        })
    }

    public async Delete(req: Request, res: Response){

        const cliente = await super.GetCliente(req.params.id);
        const npaquetes: number = cliente ? await super.NumberOfPaquetesBySupplier(cliente) : 0;        

        if(npaquetes > 0){
            res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id} tiene ${npaquetes} paquetes`});
        }else{
            if (cliente == undefined){
                res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id} No existe`});         
            }else{
                Cliente.findByIdAndDelete(req.params.id,req.body,(err:Error, cliente:any)=>{
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( cliente? {"deleted":true, "message":"Sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
                });    
            }
        }        
    }

    public NewOne(req: Request, res: Response){
        const p = new Cliente(req.body);
        p.save((err:Error, cliente: ICliente)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"successed":true, "Cliente": cliente } : {"successed":false} );
        });
    } 

    public GetAllPaquetesCliente(req:Request,res:Response){  //Funcion que busca todos los clientes con sus paquetes
                                                        
        Cliente.aggregate([{
            "$lookup":{
                from: "paquete",
                localField:"_id",
                foreignField:"cliente",
                as:"paquetes"
            }
        }],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }


 
    public GetPaquetesByIdCliente(req: Request, res: Response) {                            //Revisar bien y realizar cambios
        Paquete.find().populate("cliente").exec((err: Error, paquete: IPaquete) => {
            if (err) {
                res.status(401).json(err);
            } else {
                res.status(200).json(paquete);
            }

        });
    }

}
 