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
        this.app.route("/repartidores/paquetes").get(this.rev_service.getAllWPackage);
        this.app.route("/repartidor/:id_rep").get(this.rev_service.GetById);
        this.app.route("/repartidor/:id_rep").put(this.rev_service.Update);
        this.app.route("/repartidor/Login").post(this.rev_service.Login);
        this.app.route("/repartidor/Registro").post(this.rev_service.NewOne);
        this.app.route("/repartidor/:id_rep").delete(this.rev_service.Delete);

    }
}