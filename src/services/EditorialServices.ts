import EditorialRepository, { editorialRepository } from "../repositories/EditorialRepository";
import EditorialOutputDTO from "../model/dto/Output/EditorialOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class EditorialServices {
    private repository: EditorialRepository;

    constructor() {
        this.repository = editorialRepository;
    }

    public async getAllEditorials(): Promise<EditorialOutputDTO[]> {
        try {
            return await this.repository.getAllEditorials();
        } catch (error) {
            throw error
        }
    }

    public async getEditorialByID(token: string): Promise<EditorialOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getEditorialById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertEditorial(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertEditorial(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateEditorial(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateEditorial(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteEditorial(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteEditorial(id);
        } catch (error) {
            throw error;
        }
    }

}
export default EditorialServices;
export const editorialService = new EditorialServices();