import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import CategoriaController, { categoriaController } from "../controller/CategoriaController";
// import CategoriaInputDTO from "../model/dto/Input/CategoriaInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class CategoriaRoutes extends RouterCommon<CategoriaController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: CategoriaController;

    constructor() {
        super(CategoriaController, ValidateMiddlewareDTO);
        this.path = '/categoria';
        this.router = Router();
        this.controller = categoriaController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllCategoria)
        this.router.get(`${this.path}/id`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.getCategoriaById(req, res);
            });
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, CategoriaInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertCategoria(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, CategoriaInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updateCategoria(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deleteCategoria(req, res);
            }
        )
    }
}

export const categoriaRoutes = new CategoriaRoutes();