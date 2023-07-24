import PrestamoRepository, { prestamoRepository } from "../repositories/PrestamoRepository";
import PrestamoOutputDTO from "../model/dto/Output/PrestamoOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class PrestamoServices {
    private repository: PrestamoRepository;

    constructor() {
        this.repository = prestamoRepository;
    }

    public async getAllPrestamos(): Promise<PrestamoOutputDTO[]> {
        try {
            return await this.repository.getAllPrestamos();
        } catch (error) {
            throw error
        }
    }

    public async getPrestamoByID(token: string): Promise<PrestamoOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getPrestamoById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertPrestamo(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertPrestamo(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updatePrestamo(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updatePrestamo(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deletePrestamo(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deletePrestamo(id);
        } catch (error) {
            throw error;
        }
    }

}
export default PrestamoServices;
export const prestamoService = new PrestamoServices();