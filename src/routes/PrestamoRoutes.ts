import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import PrestamoController, { prestamoController } from "../controller/PrestamoController";
// import PrestamoInputDTO from "../model/dto/Input/PrestamoInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class PrestamoRoutes extends RouterCommon<PrestamoController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: PrestamoController;

    constructor() {
        super(PrestamoController, ValidateMiddlewareDTO);
        this.path = '/prestamo';
        this.router = Router();
        this.controller = prestamoController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllPrestamo)
        this.router.get(`${this.path}/id`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.getPrestamoById(req, res);
            });
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, PrestamoInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertPrestamo(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, PrestamoInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updatePrestamo(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deletePrestamo(req, res);
            }
        )
    }
}

export const prestamoRoutes = new PrestamoRoutes();