import PrestamoServices, { prestamoService } from "../services/PrestamoServices";
import { Request, Response } from "express";

export class PrestamoController {
    private readonly service: PrestamoServices;
    private cookie: string;
    constructor() {
        this.service = prestamoService;
        this.cookie = 'token';
    }

    public getAllPrestamo = async (_req: Request, res: Response) => {
        try {
            const Prestamos = await this.service.getAllPrestamos();
            res.json(Prestamos);
        } catch (error) {
            console.error('Error al obtener los prestamos:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener los prestamos, revise la consola para más información' });

        }
    }

    public getPrestamoById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Prestamo = await this.service.getPrestamoByID(token);
            res.clearCookie(this.cookie);
            res.json(Prestamo);
        } catch (error) {
            console.error('Error al obtener el préstamo:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener el préstamo, revise la consola para más información' });
        }
    }

    // public insertPrestamo = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newPrestamo = await this.service.insertPrestamo(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newPrestamo);
    //     } catch (error) {
    //         console.error('Error al insertar el préstamo:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar el préstamo, revise la consola para más información' });
    //     }
    // }

    // public updatePrestamo = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updatePrestamo(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar el préstamo:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar el préstamo, revise la consola para más información' });
    //     }
    // }

    public deletePrestamo = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deletePrestamo(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar el préstamo:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el préstamo, revise la consola para más información' });
        }
    }
}
export default PrestamoController
export const prestamoController = new PrestamoController();