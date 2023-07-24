import EstadoRepository, { estadoRepository } from "../repositories/EstadoRepository";
import EstadoOutputDTO from "../model/dto/Output/EstadoOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class EstadoServices {
    private repository: EstadoRepository;

    constructor() {
        this.repository = estadoRepository;
    }

    public async getAllEstados(): Promise<EstadoOutputDTO[]> {
        try {
            return await this.repository.getAllEstados();
        } catch (error) {
            throw error
        }
    }

    public async getEstadoByID(token: string): Promise<EstadoOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getEstadoById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertEstado(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertEstado(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateEstado(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateEstado(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteEstado(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteEstado(id);
        } catch (error) {
            throw error;
        }
    }

}
export default EstadoServices;
export const estadoService = new EstadoServices();