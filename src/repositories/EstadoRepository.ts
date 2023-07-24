import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import EstadoInputDTO from "../model/dto/Input/EstadoInputDTO";
import EstadoOutputDTO from "../model/dto/Output/EstadoOutputDTO";
import { plainToClass } from "class-transformer";

class EstadoRepository extends QueriesCommon<EstadoInputDTO, EstadoOutputDTO>{

    constructor(
        public table = 'estado_libro'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): EstadoOutputDTO[] {
        return rows.map((row) =>
            plainToClass(EstadoOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllEstados(): Promise<EstadoOutputDTO[]> {
        const queryParams = {
            table: this.table
        };
        try {
            return await this.getAll(queryParams);
        } catch (error) {
            console.error("Error al obtener los estados:", error);
            throw new Error("Error al obtener los estados");
        }
    }

    public async getEstadoById(id: any): Promise<EstadoOutputDTO | null> {
        const queryParams = {
            table: this.table,
            where: id.toString()
        };
        try {
            return await this.getOneById(id, queryParams);
        } catch (error) {
            console.error("Error al obtener los estados:", error);
            throw new Error("Error al obtener los estados");
        }
    }

    // public async insertEstado(body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table
    //     };
    //     try {
    //         return await this.insert(body, queryParams);
    //     } catch (error) {
    //         console.error("Error al insertar el estado:", error);
    //         throw new Error("Error al insertar el estado");
    //     }
    // }

    // public async updateEstado(id: any, body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table,
    //         where: id.toString()
    //     };
    //     try {
    //         return await this.put(id, body, queryParams);
    //     } catch (error) {
    //         console.error("Error al actualizar el estado:", error);
    //         throw new Error("Error al actualizar el estado");
    //     }
    // }

    public async deleteEstado(id: any): Promise<string> {
        const queryParams = {
            table: this.table,
            where: id.toString()
        };
        try {
            return await this.delete(queryParams);
        } catch (error) {
            console.error("Error al eliminar el estado:", error);
            throw new Error("Error al eliminar el estado");
        }
    }
}

export default EstadoRepository;
export const estadoRepository = new EstadoRepository();