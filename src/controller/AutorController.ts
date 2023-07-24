import AutorServices, { autorService } from "../services/AutorServices";
import { Request, Response } from "express";

export class AutorController {
    private readonly service: AutorServices;
    private cookie: string;
    constructor() {
        this.service = autorService;
        this.cookie = 'token';
    }

    public getAllAutor = async (_req: Request, res: Response) => {
        try {
            const Autors = await this.service.getAllAutors();
            res.json(Autors);
        } catch (error) {
            console.error('Error al obtener los autores:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener los autores, revise la consola para más información' });

        }
    }

    public getAutorById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Autor = await this.service.getAutorByID(token);
            res.clearCookie(this.cookie);
            res.json(Autor);
        } catch (error) {
            console.error('Error al obtener el autor:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener el autor, revise la consola para más información' });
        }
    }

    // public insertAutor = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newAutor = await this.service.insertAutor(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newAutor);
    //     } catch (error) {
    //         console.error('Error al insertar el autor:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar el autor, revise la consola para más información' });
    //     }
    // }

    // public updateAutor = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateAutor(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar el autor:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar el autor, revise la consola para más información' });
    //     }
    // }

    public deleteAutor = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteAutor(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar el autor:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el autor, revise la consola para más información' });
        }
    }
}
export default AutorController
export const autorController = new AutorController();