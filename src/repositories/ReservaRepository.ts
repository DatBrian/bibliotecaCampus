import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import ReservaInputDTO from "../model/dto/Input/ReservaInputDTO";
import ReservaOutputDTO from "../model/dto/Output/ReservaOutputDTO";
import { plainToClass } from "class-transformer";

class ReservaRepository extends QueriesCommon<ReservaInputDTO, ReservaOutputDTO>{

    constructor(
        public table = 'reserva'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): ReservaOutputDTO[] {
        return rows.map((row) =>
            plainToClass(ReservaOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllReservas(): Promise<ReservaOutputDTO[]> {
        const queryParams = {
            select: `${this.table}.*, usuario.nombre AS usuario, libro.titulo AS libro`,
            table: this.table,
            joins: `
                JOIN usuario ON usuario.id_usuario = ${this.table}.id_usuario
                JOIN libro ON libro.id_libro = ${this.table}.id_libro`
        };
        try {
            return await this.getAll(queryParams);
        } catch (error) {
            console.error("Error al obtener las reservas:", error);
            throw new Error("Error al obtener las reservas");
        }
    }

    public async getReservaById(id: any): Promise<ReservaOutputDTO | null> {
        const queryParams = {
            select: `${this.table}.*,usuario.nombre AS usuario, libro.titulo AS libro`,
            table: this.table,
            joins: `
                JOIN usuario ON usuario.id_usuario = ${this.table}.id_usuario
                JOIN libro ON libro.id_libro = ${this.table}.id_libro`,
            where: id.toString()
        };
        try {
            return await this.getOneById(id, queryParams);
        } catch (error) {
            console.error("Error al obtener las reservas:", error);
            throw new Error("Error al obtener las reservas");
        }
    }

    // public async insertReserva(body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table
    //     };
    //     try {
    //         return await this.insert(body, queryParams);
    //     } catch (error) {
    //         console.error("Error al insertar la reserva:", error);
    //         throw new Error("Error al insertar la reserva");
    //     }
    // }

    // public async updateReserva(id: any, body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table,
    //         where: id.toString()
    //     };
    //     try {
    //         return await this.put(id, body, queryParams);
    //     } catch (error) {
    //         console.error("Error al actualizar la reserva:", error);
    //         throw new Error("Error al actualizar la reserva");
    //     }
    // }

    public async deleteReserva(id: any): Promise<string> {
        const queryParams = {
            table: this.table,
            where: id.toString()
        };
        try {
            return await this.delete(queryParams);
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
            throw new Error("Error al eliminar la reserva");
        }
    }
}

export default ReservaRepository;
export const reservaRepository = new ReservaRepository();