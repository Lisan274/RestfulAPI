import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private paq_service: PaqueteService;
    constructor(private app: Application){
        this.paq_service = new PaqueteService();
        this.routes();
    }
    private routes(){
<<<<<<< HEAD
        this.app.route("/paquete/:id").get(this.paquete_service.GetPaquete);
        this.app.route("/paquetes").get(this.paquete_service.getAll);
        this.app.route("/paquete/:id").put(this.paquete_service.Update);
        this.app.route("/paquete/:id").delete(this.paquete_service.Delete);
        this.app.route("/paquete").post(this.paquete_service.NewOne);
        this.app.route("/paquetes/tipo1").get(this.paquete_service.Gettype_1);
        this.app.route("/paquetes/tipo2").get(this.paquete_service.Gettype_2);
        this.app.route("/paquetes/tipo3").get(this.paquete_service.Gettype_3);
        this.app.route("/cliente/paquetes/:id").get(this.paquete_service.getByCliente);
        this.app.route("/repartidor/paquetes/:id").get(this.paquete_service.getByRepartidor);
=======
        this.app.route("/paquete/:id").delete(this.paq_service.Delete);
        this.app.route("/paquetes").get(this.paq_service.getAll);
        this.app.route("/paquete").post(this.paq_service.NewOne);
        this.app.route("/paquete/:id").get(this.paq_service.GetPaqueteId);
        this.app.route("/paquete/tipo_paquete/:n").get(this.paq_service.GetType);
        this.app.route("/cliente/paquetes/:id").get(this.paq_service.GetPaquetesCliente);
        this.app.route("/repartidor/paquetes/:id").get(this.paq_service.GetPaquetesRepartidor);
>>>>>>> Lisandro
        
        

    }   
    
}