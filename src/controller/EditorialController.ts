import EditorialServices, { editorialService } from "../services/EditorialServices";
import { Request, Response } from "express";

export class EditorialController {
    private readonly service: EditorialServices;
    private cookie: string;
    constructor() {
        this.service = editorialService;
        this.cookie = 'token';
    }

    public getAllEditorial = async (_req: Request, res: Response) => {
        try {
            const Editorials = await this.service.getAllEditorials();
            res.json(Editorials);
        } catch (error) {
            console.error('Error al obtener las editoriales:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las editoriales, revise la consola para más información' });

        }
    }

    public getEditorialById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Editorial = await this.service.getEditorialByID(token);
            res.clearCookie(this.cookie);
            res.json(Editorial);
        } catch (error) {
            console.error('Error al obtener la editorial:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la editorial, revise la consola para más información' });
        }
    }

    // public insertEditorial = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const newEditorial = await this.service.insertEditorial(token);
    //         res.clearCookie(this.cookie);
    //         res.json(newEditorial);
    //     } catch (error) {
    //         console.error('Error al insertar la editorial:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al insertar la editorial, revise la consola para más información' });
    //     }
    // }

    // public updateEditorial = async (req: Request, res: Response) => {
    //     try {
    //         const token = await req.cookies.token;
    //         const updated = await this.service.updateEditorial(token);
    //         res.clearCookie(this.cookie);
    //         res.json(updated)
    //     } catch (error) {
    //         console.error('Error al actualizar la editorial:', error);
    //         res.status(500).json({ error: 'Ocurrió un error al actualizar la editorial, revise la consola para más información' });
    //     }
    // }

    public deleteEditorial = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteEditorial(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar la editorial:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar la editorial, revise la consola para más información' });
        }
    }
}
export default EditorialController
export const editorialController = new EditorialController();