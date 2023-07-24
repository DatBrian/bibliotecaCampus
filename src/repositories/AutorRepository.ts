import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import AutorInputDTO from "../model/dto/Input/AutorInputDTO";
import AutorOutputDTO from "../model/dto/Output/AutorOutputDTO";
import { plainToClass } from "class-transformer";

class AutorRepository extends QueriesCommon<AutorInputDTO, AutorOutputDTO>{

    constructor(
        public table = 'autor'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): AutorOutputDTO[] {
        return rows.map((row) =>
            plainToClass(AutorOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllAutors(): Promise<AutorOutputDTO[]> {
        const queryParams = {
            table: this.table
        };
        try {
            return await this.getAll(queryParams);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    public async getAutorById(id: any): Promise<AutorOutputDTO | null> {
        const queryParams = {
            table: this.table,
            where: id.toString()
        };
        try {
            return await this.getOneById(id, queryParams);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    // public async insertAutor(body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table
    //     };
    //     try {
    //         return await this.insert(body, queryParams);
    //     } catch (error) {
    //         console.error("Error al insertar la categoría:", error);
    //         throw new Error("Error al insertar la categoría");
    //     }
    // }

    // public async updateAutor(id: any, body: any): Promise<string> {
    //     const queryParams = {
    //         table: this.table,
    //         where: id.toString()
    //     };
    //     try {
    //         return await this.put(id, body, queryParams);
    //     } catch (error) {
    //         console.error("Error al actualizar la categoría:", error);
    //         throw new Error("Error al actualizar la categoría");
    //     }
    // }

    public async deleteAutor(id: any): Promise<string> {
        const queryParams = {
            table: this.table,
            where: id.toString()
        };
        try {
            return await this.delete(queryParams);
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            throw new Error("Error al eliminar la categoría");
        }
    }
}

export default AutorRepository;
export const autorRepository = new AutorRepository();