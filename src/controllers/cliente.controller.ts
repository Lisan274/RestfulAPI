import {Application} from "express";
import {ClienteService} from "../services/cliente.service";


export class ClienteController{
    private clie_service: ClienteService;
    constructor(private app: Application){
        this.clie_service = new ClienteService();
        this.routes();
    }
    private routes(){

        this.app.route("/cliente/:id_clie").get(this.clie_service.GetById);
        //this.app.route("/cliente/:id_clie/paquete").get(this.clie_service.GetClientePaquetes);
        this.app.route("/clientes").get(this.clie_service.getAll);

      
        this.app.route("/cliente").post(this.clie_service.Login);
        this.app.route("/cliente").get(this.clie_service.ClienteLog);
        //this.app.route("/cliente").post(this.clie_service.ClienteLog);
        //.get(this.clie_service.ClienteLog)
        this.app.route("/cliente").post(this.clie_service.NewOne);

        //this.app.route("/cliente/:correo").get(this.clie_service.Login);
        this.app.route("/cliente/:id_clie")
        .get(this.clie_service.GetById)
        .put(this.clie_service.Update)
        .delete(this.clie_service.Delete);
    }
}

        
