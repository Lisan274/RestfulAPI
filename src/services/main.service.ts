import {Request, Response} from "express";

export class MainService{
    public Welcome(req: Request, res: Response){
        return res.send("Welcome to ObjectsExpress Restful API");
    }
}