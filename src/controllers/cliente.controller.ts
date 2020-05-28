import {Application} from "express";
import {ClienteService} from "../services/cliente.service";


export class ClienteController{
    private clie_service: ClienteService;
    constructor(private app: Application){
        this.clie_service = new ClienteService();
        this.routes();
    }
    private routes(){

        this.app.route("/clientes").get(this.clie_service.getAll);
        this.app.route("/clientes/paquetes").get(this.clie_service.getAllWPackage);
        this.app.route("/cliente/Login").post(this.clie_service.Login);
        this.app.route("/cliente/Registro").post(this.clie_service.NewOne);
        this.app.route("/cliente/:id_clie")
        .get(this.clie_service.GetById)
        .put(this.clie_service.Update)
        .delete(this.clie_service.Delete);
    }
}

        
