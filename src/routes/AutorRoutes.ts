import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import AutorController, { autorController } from "../controller/AutorController";
// import AutorInputDTO from "../model/dto/Input/AutorInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class AutorRoutes extends RouterCommon<AutorController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: AutorController;

    constructor() {
        super(AutorController, ValidateMiddlewareDTO);
        this.path = '/Autor';
        this.router = Router();
        this.controller = autorController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllAutor)
        this.router.get(`${this.path}/id`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.getAutorById(req, res);
            });
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, AutorInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertAutor(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, AutorInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updateAutor(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deleteAutor(req, res);
            }
        )
    }
}

export const autorRoutes = new AutorRoutes();