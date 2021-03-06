import {Request, Response} from "express";
import { Cliente, ICliente} from "../models/cliente.model";
import { Paquete, IPaquete} from "../models/paquete.model";
import { MongooseDocument } from "mongoose";
import { resolve } from "dns";
import { json } from "body-parser";


class ClienteHelpers{

    GetClient(filter: any): Promise<ICliente> {
        return new Promise<ICliente>((resolve) => {
            Cliente.find(filter, (err: Error, cliente: ICliente) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(cliente);
                }
            });
        });
    }

    GetCliente(id_clie: string):Promise<ICliente>{        //obtener el objeto cliente, consulta al cluste por eso es una promesa
        return new Promise<ICliente>( (resolve) => {        // la promesa retorna un cliente
            Cliente.findById(id_clie,(err:Error,cliente:ICliente)=>{
                if(err){
                    console.log(err);
                }
                resolve(cliente);
            }); 
        });
    }

    NumberOfPaquetesBySupplier(clie: ICliente):Promise<number>{        //comprobar cuantos paquetes tiene el cliente
        return new Promise<number>( resolve => {
            Paquete.aggregate([
                { "$match": { "cliente": clie._id }}                
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
       const my_clie = await super.GetCliente(req.params.id_clie);
       res.status(200).send(my_clie);
    }
/*

    public async ClienteLog(req: Request, res: Response){
        let {correo, password} = req.body;
        const p = await Cliente.find({ correo: correo});
            if(p){
                if(password){
                    res.status(200).json( {"mensaje": "Login correcto"});
                    console.log("Login");
                } else
                res.status(401).json({"mensaje": "Contraseña incorrecta"});
            } else{
            res.status(401).json( {"mensaje": "Usuria no encontrado"} );
        }
    }
*/
    
    public Login(req: Request,res: Response){
        console.log("Login");
        Cliente.findById(req.params.correo, req.params.password, req.body,(err:Error, cliente:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"cliente":true} : {"cliente":false} );
        })
    }
    
 
    //Payload
    public Update(req: Request,res: Response){
        console.log("entro");
        Cliente.findByIdAndUpdate(req.params.id_clie,req.body,(err:Error, cliente:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( cliente? {"updated":true} : {"updated":false} );
        })
    }

    public async Delete(req: Request, res: Response){

        const Clie = await super.GetCliente(req.params.id_clie);
        const npaquetes:number = Clie? await super.NumberOfPaquetesBySupplier(Clie) : 0;        

        if(npaquetes > 0){
            res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id_clie} tiene ${npaquetes} paquetes`});
        }else{
            if(Clie == undefined){
                res.status(200).json({"deleted":false,"message":`El cliente ${req.params.id_clie} No existe`});         
            }else{
                Cliente.findByIdAndDelete(req.params.id_clie,req.body,(err:Error, cliente:any)=>{
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( cliente? {"deleted":true, "message":"Sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
                });    
            }
        }        
    }

    public NewOne(req: Request, res: Response) {
        Cliente.find({correo: req.body.correo}, function (err, docs){
            if(docs.length>0){
                res.status(401).send("Este usuario ya esta registrado");
            }else{
                const p = new Cliente(req.body);
                p.save((err: Error, cliente: ICliente) => {
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( cliente? {"successed":true, "Cliente": cliente } : {"successed":false} );
                });
            } 
        });

    } 

    public getAllWPackage(req:Request, res:Response){

        Cliente.aggregate([{
            "$lookup":{
                from: "paquetes",
                localField:"_id",
                foreignField:"clienteEmisor",
                as: "l"
            }
        }],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }


} 
