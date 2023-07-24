import EstadoServices, { estadoService } from "../services/EstadoServices";
import { Request, Response } from "express";

export class EstadoController {
    private readonly service: EstadoServices;
    private cookie: string;
    constructor() {
        this.service = estadoService;
        this.cookie = 'token';
    }

    public getAllEstado = async (_req: Request, res: Response) => {
        try {
            const Estados = await this.service.getAllEstados();
            res.json(Estados);
        } catch (error) {
            console.error('Error al obtener los estados:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener los estados, revise la consola para más información' });

        }
    }

    public getEstadoById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Estado = await this.service.getEstadoByID(token);
            res.clearCookie(this.cookie);
            res.json(Estado);
        } catch (error) {
            console.error('Error al obtener el estado:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener el estado, revise la consola para más información' });
        }
    }

    // public insertEstado = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newEstado = await this.service.insertEstado(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newEstado);
    //     } catch (error) {
    //         console.error('Error al insertar el estado:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar el estado, revise la consola para más información' });
    //     }
    // }

    // public updateEstado = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateEstado(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar el estado:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar el estado, revise la consola para más información' });
    //     }
    // }

    public deleteEstado = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteEstado(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar el estado:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el estado, revise la consola para más información' });
        }
    }
}
export default EstadoController
export const estadoController = new EstadoController();