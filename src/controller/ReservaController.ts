import ReservaServices, { reservaService } from "../services/ReservaServices";
import { Request, Response } from "express";

export class ReservaController {
    private readonly service: ReservaServices;
    private cookie: string;
    constructor() {
        this.service = reservaService;
        this.cookie = 'token';
    }

    public getAllReserva = async (_req: Request, res: Response) => {
        try {
            const Reservas = await this.service.getAllReservas();
            res.json(Reservas);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las reservas, revise la consola para más información' });

        }
    }

    public getReservaById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Reserva = await this.service.getReservaByID(token);
            res.clearCookie(this.cookie);
            res.json(Reserva);
        } catch (error) {
            console.error('Error al obtener la reserva:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la reserva, revise la consola para más información' });
        }
    }

    // public insertReserva = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newReserva = await this.service.insertReserva(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newReserva);
    //     } catch (error) {
    //         console.error('Error al insertar la reserva:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar la reserva, revise la consola para más información' });
    //     }
    // }

    // public updateReserva = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateReserva(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar la reserva:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar la reserva, revise la consola para más información' });
    //     }
    // }

    public deleteReserva = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteReserva(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar la reserva, revise la consola para más información' });
        }
    }
}
export default ReservaController
export const reservaController = new ReservaController();