import LibroRepository, { libroRepository } from "../repositories/LibroRepository";
import LibroOutputDTO from "../model/dto/Output/LibroOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class LibroServices {
    private repository: LibroRepository;

    constructor() {
        this.repository = libroRepository;
    }

    public async getAllLibros(): Promise<LibroOutputDTO[]> {
        try {
            return await this.repository.getAllLibros();
        } catch (error) {
            throw error
        }
    }

    public async getLibroByID(token: string): Promise<LibroOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getLibroById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertLibro(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertLibro(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateLibro(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateLibro(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteLibro(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteLibro(id);
        } catch (error) {
            throw error;
        }
    }

    public async getLibrosDisponibles(): Promise<LibroOutputDTO[]>{
        try {
            return await this.repository.getLibrosDisponibles();
        } catch (error) {
            throw error;
        }
    }

}
export default LibroServices;
export const libroService = new LibroServices();