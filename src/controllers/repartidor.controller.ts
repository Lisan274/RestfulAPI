import {Application} from "express";
import {RepartidorService} from "../services/repartidor.service";

export class RepartidorController{
    private rev_service: RepartidorService;
    constructor(private app: Application){
        this.rev_service = new RepartidorService();
        this.routes();
    }
    private routes(){
        this.app.route("/repartidores").get(this.rev_service.getAll);
        this.app.route("/repartidor/:id").get(this.rev_service.GetRepartidor);
        this.app.route("/repartidor/:id").put(this.rev_service.Update);

    }
}