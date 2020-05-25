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
        this.app.route("/repartidor/Login").post(this.rev_service.Login);
        this.app.route("/repartidor/Registro").post(this.rev_service.NewOne);
        this.app.route("/cliente/:id_clie").get(this.rev_service.Delete);

    }
}