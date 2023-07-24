import ReservaRepository, { reservaRepository } from "../repositories/ReservaRepository";
import ReservaOutputDTO from "../model/dto/Output/ReservaOutputDTO";
import { verifyJWT } from "../common/FunctionsCommon";

class ReservaServices {
    private repository: ReservaRepository;

    constructor() {
        this.repository = reservaRepository;
    }

    public async getAllReservas(): Promise<ReservaOutputDTO[]> {
        try {
            return await this.repository.getAllReservas();
        } catch (error) {
            throw error
        }
    }

    public async getReservaByID(token: string): Promise<ReservaOutputDTO | null> {
        try {
            const body = await verifyJWT(token)
            const id = await body.id;
            return await this.repository.getReservaById(id);
        } catch (error) {
            throw error
        }
    }


    // public async insertReserva(token: string): Promise<string> {

    //     try {
    //         return await this.repository.insertReserva(await verifyJWT(token));
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async updateReserva(token: string): Promise<any> {
    //     try {
    //         const body = await verifyJWT(token);
    //         const id = await body.id;
    //         delete body.id
    //         return await this.repository.updateReserva(id, body);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async deleteReserva(token: string): Promise<string> {
        try {
            const body = await verifyJWT(token);
            const id = await body.id;
            return await this.repository.deleteReserva(id);
        } catch (error) {
            throw error;
        }
    }

}
export default ReservaServices;
export const reservaService = new ReservaServices();