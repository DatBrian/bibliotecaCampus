import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import PrestamoInputDTO from "../model/dto/Input/PrestamoInputDTO";
import PrestamoOutputDTO from "../model/dto/Output/PrestamoOutputDTO";
import { plainToClass } from "class-transformer";

class PrestamoRepository extends QueriesCommon<PrestamoInputDTO, PrestamoOutputDTO>{

    constructor(
        public table = 'prestamo'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): PrestamoOutputDTO[] {
        return rows.map((row) =>
            plainToClass(PrestamoOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllPrestamos(): Promise<PrestamoOutputDTO[]> {
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
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    public async getPrestamoById(id: any): Promise<PrestamoOutputDTO | null> {
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
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    // public async insertPrestamo(body: any): Promise<string> {
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

    // public async updatePrestamo(id: any, body: any): Promise<string> {
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

    public async deletePrestamo(id: any): Promise<string> {
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

export default PrestamoRepository;
export const prestamoRepository = new PrestamoRepository();