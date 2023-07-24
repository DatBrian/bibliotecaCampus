import LibroServices, { libroService } from "../services/LibroServices";
import { Request, Response } from "express";

export class LibroController {
    private readonly service: LibroServices;
    private cookie: string;
    constructor() {
        this.service = libroService;
        this.cookie = 'token';
    }

    public getAllLibro = async (_req: Request, res: Response) => {
        try {
            const Libros = await this.service.getAllLibros();
            res.json(Libros);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener los libros, revise la consola para más información' });

        }
    }

    public getLibroById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Libro = await this.service.getLibroByID(token);
            res.clearCookie(this.cookie);
            res.json(Libro);
        } catch (error) {
            console.error('Error al obtener el libro:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener el libro, revise la consola para más información' });
        }
    }

    // public insertLibro = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newLibro = await this.service.insertLibro(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newLibro);
    //     } catch (error) {
    //         console.error('Error al insertar el libro:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar el libro, revise la consola para más información' });
    //     }
    // }

    // public updateLibro = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateLibro(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar el libro:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar el libro, revise la consola para más información' });
    //     }
    // }

    public deleteLibro = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteLibro(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el libro, revise la consola para más información' });
        }
    }

    public getLibrosDisponibles = async (_req: Request, res: Response) => {
        try {
            const libros = await this.service.getLibrosDisponibles();
            res.json(libros);
        } catch (error) {
            console.error('Error al obtener los libros disponibles:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener los libros disponibles, revise la consola para más información' });
        }
    }
}
export default LibroController
export const libroController = new LibroController();