import {Application} from "express";
import {ClienteService} from "../services/cliente.service";

export class ClienteController{
    private prov_service: ClienteService;
    constructor(private app: Application){
        this.prov_service = new ClienteService();
        this.routes();
    }
    private routes(){
        this.app.route("/clientes").get(this.prov_service.getAll);

        this.app.route("/cliente").post(this.prov_service.NewOne);

        this.app.route("/cliente/:id_prov")
        .get(this.prov_service.GetById)

        .put(this.prov_service.Update)
        .delete(this.prov_service.Delete);
    }
}
