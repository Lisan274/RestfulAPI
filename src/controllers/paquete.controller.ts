import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private paq_service: PaqueteService;
    constructor(private app: Application){
        this.paq_service = new PaqueteService();
        this.routes();
    }
    private routes(){
        this.app.route("/paquete/:id").get(this.paq_service.GetPaquete)
        .delete(this.paq_service.Delete);
        
        this.app.route("/paquetes").get(this.paq_service.getAll);
    }
}