import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private prov_service: PaqueteService;
    constructor(private app: Application){
        this.prov_service = new PaqueteService();
        this.routes();
    }
    private routes(){
        this.app.route("/paquetes").get(this.prov_service.getAll);

        //this.app.route("/paquete").post(this.prov_service.NewOne);

        //this.app.route("/paquete/:id_prov")
        //.get(this.prov_service.GetById)
        //.put(this.prov_service.Update)
        //.delete(this.prov_service.Delete);
    }
}