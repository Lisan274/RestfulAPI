import { Application } from "express";
import { Cliente_ReceptorService } from "../services/cliente_receptor.service";

export class ClienteReceptorController {
    private recep_service: Cliente_ReceptorService;
    constructor(private app: Application) {
        this.recep_service = new Cliente_ReceptorService();
        this.routes();
    }
    private routes() {

        this.app.route("/clientes").get(this.recep_service.getAll);
       // this.app.route("/cliente/Login").post(this.recep_service.Login);
        this.app.route("/clientereceptor").post(this.recep_service.NewOne);
        this.app.route("/cliente/:id_clie")
            .get(this.recep_service.GetById)
            .put(this.recep_service.Update)
            .delete(this.recep_service.Delete);
        this.app.route("/clientes/paquetes").get(this.recep_service.GetAllPaquetesCliente);
    }
}


