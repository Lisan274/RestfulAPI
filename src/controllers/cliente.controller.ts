import {Application} from "express";
import {ClienteService} from "../services/cliente.service";

export class ClienteController{
    private clien_service: ClienteService;
    constructor(private app: Application){
        this.clien_service = new ClienteService();
        this.routes();
    }
    private routes(){
        this.app.route("/clientes").get(this.clien_service.getAll);

        this.app.route("/cliente").post(this.clien_service.NewOne);
        
        this.app.route("/cliente/:id_prov")
        .get(this.clien_service.GetById)
        .put(this.clien_service.Update)
        .delete(this.clien_service.Delete);
    
        this.app.route("/clientes/paquetes").get(this.clien_service.GetAllPaquetesCliente);
        this.app.route("/cliente/paquetes/:id_prov").get(this.clien_service.GetPaquetesByIdCliente);
    
    }
}
