import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private paquete_service: PaqueteService;
    constructor(private app: Application){
        this.paquete_service = new PaqueteService();
        this.routes();
    }
    private routes(){
        this.app.route("/paquete/:id").get(this.paquete_service.GetPaquete);
        this.app.route("/paquetes").get(this.paquete_service.getAll);
        this.app.route("/paquete/:id").put(this.paquete_service.Update);
        this.app.route("/paquete/:id").delete(this.paquete_service.Delete);
        this.app.route("/paquete").post(this.paquete_service.NewOne);
        this.app.route("/paquetes/tipo1").get(this.paquete_service.Gettype_1);
        this.app.route("/paquetes/tipo2").get(this.paquete_service.Gettype_2);
        this.app.route("/paquetes/tipo3").get(this.paquete_service.Gettype_3);
        
    
    }
}