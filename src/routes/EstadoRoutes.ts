import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import EstadoController, { estadoController } from "../controller/EstadoController";
// import EstadoInputDTO from "../model/dto/Input/EstadoInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class EstadoRoutes extends RouterCommon<EstadoController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: EstadoController;

    constructor() {
        super(EstadoController, ValidateMiddlewareDTO);
        this.path = '/estado';
        this.router = Router();
        this.controller = estadoController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllEstado)
        //todo: realizar una consulta personalizada para obtener por id ya que no coincide con el patrón en QueriesCommon
        // this.router.get(`${this.path}/id`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.getEstadoById(req, res);
        //     });
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, EstadoInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertEstado(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, EstadoInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updateEstado(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deleteEstado(req, res);
            }
        )
    }
}

export const estadoRoutes = new EstadoRoutes();