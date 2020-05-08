import {Application} from "express";
import {PaqueteService} from "../services/paquete.service";

export class PaqueteController{
    private prov_service: PaqueteService;
    constructor(private app: Application){
        this.prov_service = new PaqueteService();
        this.routes();
    }
    private routes(){
        this.app.route("/paquete/:id").get(this.prov_service.GetPaquete);
        this.app.route("/paquetes").get(this.prov_service.getAll);
        this.app.route("/paquete/:id").put(this.prov_service.Update);
        this.app.route("/paquete/:id").delete(this.prov_service.Delete);
        this.app.route("/paquete").post(this.prov_service.NewOne);
        this.app.route("/paquetes/tipo1").get(this.prov_service.Gettype_1);
        this.app.route("/paquetes/tipo2").get(this.prov_service.Gettype_2);
        this.app.route("/paquetes/tipo3").get(this.prov_service.Gettype_3);
        
        //this.app.route("/paquete").post(this.prov_service.NewOne);

        //this.app.route("/paquete/:id_prov")
        //.get(this.prov_service.GetById)
        //.put(this.prov_service.Update)
        //.delete(this.prov_service.Delete);
    }
}