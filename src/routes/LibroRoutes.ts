import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import LibroController, { libroController } from "../controller/LibroController";
// import LibroInputDTO from "../model/dto/Input/LibroInputDTO";
import JWTMiddleware from "../middleware/JWTMiddleware";
import ParamsInputDTO from "../model/dto/Input/ParamsInputDTO";

class LibroRoutes extends RouterCommon<LibroController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: LibroController;

    constructor() {
        super(LibroController, ValidateMiddlewareDTO);
        this.path = '/libro';
        this.router = Router();
        this.controller = libroController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllLibro)
        this.router.get(`${this.path}/id`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.getLibroById(req, res);
            });
        this.router.get(`${this.path}/disponibles`, this.controller.getLibrosDisponibles)
        // this.router.post(`${this.path}/create`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, LibroInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.insertLibro(req, res);
        //     });
        // this.router.put(`${this.path}/update`,
        //     (req, res, next) => {
        //         ValidateMiddlewareDTO.validator(req, res, next, LibroInputDTO);
        //     },
        //     JWTMiddleware.execute,
        //     (req, res) => {
        //         this.controller.updateLibro(req, res)
        //     });
        this.router.delete(`${this.path}/delete`,
            (req, res, next) => {
                ValidateMiddlewareDTO.validator(req, res, next, ParamsInputDTO);
            },
            JWTMiddleware.execute,
            (req, res) => {
                this.controller.deleteLibro(req, res);
            }
        )
    }
}

export const libroRoutes = new LibroRoutes();