import {Application} from "express";
import {RepartidorService} from "../services/repartidor.service";

export class RepartidorController{
    private rep_service: RepartidorService;
    constructor(private app: Application){
        this.rep_service = new RepartidorService();
        this.routes();
    }
    private routes(){
        this.app.route("/repartidores").get(this.rep_service.getAll);
        this.app.route("repartidor/paquetes").get(this.rep_service.GetAllPaquetesRepartidor);
        this.app.route("/repartidor").post(this.rep_service.NewOne);
        this.app.route("/repartidor/:id").get(this.rep_service.GetRepartidor);
        this.app.route("/repartidor/:id").put(this.rep_service.Update);

    }
}