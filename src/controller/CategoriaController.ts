import CategoriaServices, { categoriaService } from "../services/CategoriaServices";
import { Request, Response } from "express";

export class CategoriaController {
    private readonly service: CategoriaServices;
    private cookie: string;
    constructor() {
        this.service = categoriaService;
        this.cookie = 'token';
    }

    public getAllCategoria = async (_req: Request, res: Response) => {
        try {
            const Categorias = await this.service.getAllCategorias();
            res.json(Categorias);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las categorías, revise la consola para más información' });

        }
    }

    public getCategoriaById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Categoria = await this.service.getCategoriaByID(token);
            res.clearCookie(this.cookie);
            res.json(Categoria);
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la categoría, revise la consola para más información' });
        }
    }

    // public insertCategoria = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newCategoria = await this.service.insertCategoria(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newCategoria);
    //     } catch (error) {
    //         console.error('Error al insertar la categoría:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar la categoría, revise la consola para más información' });
    //     }
    // }

    // public updateCategoria = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateCategoria(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar la categoría:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar la categoría, revise la consola para más información' });
    //     }
    // }

    public deleteCategoria = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteCategoria(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar la categoría, revise la consola para más información' });
        }
    }
}
export default CategoriaController
export const categoriaController = new CategoriaController();