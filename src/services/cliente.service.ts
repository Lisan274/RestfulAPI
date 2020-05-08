import {Request, Response} from "express";
import { Cliente, ICliente } from "../models/cliente.model";
import { Paquete, IPaquete } from "../models/paquete.model";
import { MongooseDocument } from "mongoose";
import { resolve } from "dns";
import { json } from "body-parser";


class ClienteHelpers{

    GetCliente(id_prov: string):Promise<ICliente>{        //obtener el objeto cliente, consulta al cluste por eso es una promesa
        return new Promise<ICliente>( (resolve) => {        // la promesa retorna un cliente
            Cliente.findById(id_prov,(err:Error,cliente:ICliente)=>{
                if(err){
                    console.log(err);
                }
                resolve(cliente);
            }); 
        });
    }

    NumberOfPaquetesBySupplier(prov: ICliente):Promise<number>{        //comprobar cuantos paquetes tiene 
        return new Promise<number>( resolve => {
            Paquete.aggregate([
                { "$match": { "cliente": prov._id }}                
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

    /*public Delete(req: Request, res: Response){
        Cliente.findByIdAndDelete(req.params.id_prov,req.body,(err:Error, cliente:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"deleted":true} : {"deleted":false} );
        });
    }
    */
   
    public async GetById(req: Request,res: Response){        
       const my_prov = await super.GetCliente(req.params.id_prov);
       res.status(200).send(my_prov);
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

        const Prov = await super.GetCliente(req.params.id_prov);
        const npaquetes:number = Prov? await super.NumberOfPaquetesBySupplier(Prov) : 0;        

        if(npaquetes > 0){
            res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id_prov} tiene ${npaquetes} paquetes`});
        }else{
            if(Prov == undefined){
                res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id_prov} No existe`});         
            }else{
                Cliente.findByIdAndDelete(req.params.id_prov,req.body,(err:Error, cliente:any)=>{
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

}
 