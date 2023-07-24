import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import ReservaController, { reservaController } from "../controller/ReservaController";
// import ReservaInputDTO from "../model/dto/Input/ReservaInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class ReservaRoutes extends RouterCommon<ReservaController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: ReservaController;

    constructor() {
        super(ReservaController, ValidateMiddlewareDTO);
        this.path = '/reserva';
        this.router = Router();
        this.controller = reservaController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllReserva)
        this.router.get(`${this.path}/id`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.getReservaById(req, res);
            });
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, ReservaInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertReserva(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, ReservaInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updateReserva(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deleteReserva(req, res);
            }
        )
    }
}

export const reservaRoutes = new ReservaRoutes();