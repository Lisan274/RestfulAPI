import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private paq_service: PaqueteService;
    constructor(private app: Application){
        this.paq_service = new PaqueteService();
        this.routes();
    }
    private routes(){
        this.app.route("/paquete/:id").delete(this.paq_service.Delete);
        
        this.app.route("/paquetes").get(this.paq_service.getAll);
        this.app.route("/paquete").post(this.paq_service.NewOne);
        this.app.route("/paquete/:id").get(this.paq_service.GetPaqueteId);
        this.app.route("/paquete/:tipo_paquete/:n").get(this.paq_service.GetTipoPaquete);
    }   
    
}