import CategoriaRepository, { categoriaRepository } from "../repositories/CategoriaRepository";
import CategoriaOutputDTO from "../model/dto/Output/CategoriaOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class CategoriaServices {
    private repository: CategoriaRepository;

    constructor() {
        this.repository = categoriaRepository;
    }

    public async getAllCategorias(): Promise<CategoriaOutputDTO[]> {
        try {
            return await this.repository.getAllCategorias();
        } catch (error) {
            throw error
        }
    }

    public async getCategoriaByID(token: string): Promise<CategoriaOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getCategoriaById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertCategoria(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertCategoria(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateCategoria(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateCategoria(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteCategoria(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteCategoria(id);
        } catch (error) {
            throw error;
        }
    }

}
export default CategoriaServices;
export const categoriaService = new CategoriaServices();