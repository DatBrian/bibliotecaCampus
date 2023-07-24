import AutorRepository, { autorRepository } from "../repositories/AutorRepository";
import AutorOutputDTO from "../model/dto/Output/AutorOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class AutorServices {
    private repository: AutorRepository;

    constructor() {
        this.repository = autorRepository;
    }

    public async getAllAutors(): Promise<AutorOutputDTO[]> {
        try {
            return await this.repository.getAllAutors();
        } catch (error) {
            throw error
        }
    }

    public async getAutorByID(token: string): Promise<AutorOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getAutorById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertAutor(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertAutor(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateAutor(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateAutor(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteAutor(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteAutor(id);
        } catch (error) {
            throw error;
        }
    }

}
export default AutorServices;
export const autorService = new AutorServices();