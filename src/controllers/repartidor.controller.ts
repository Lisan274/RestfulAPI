import {Application} from "express";
import {RepartidorService} from "../services/repartidor.service";

export class RepartidorController{
    private prov_service: RepartidorService;
    constructor(private app: Application){
        this.prov_service = new RepartidorService();
        this.routes();
    }
    private routes(){
        this.app.route("/repartidores").get(this.prov_service.getAll);

        //this.app.route("/repartidor").post(this.prov_service.NewOne);

        //this.app.route("/repartidor/:id_prov")
        //.get(this.prov_service.GetById)
        //.put(this.prov_service.Update)
        //.delete(this.prov_service.Delete);
    }
}