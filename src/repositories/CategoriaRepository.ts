import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import CategoriaInputDTO from "../model/dto/Input/CategoriaInputDTO";
import CategoriaOutputDTO from "../model/dto/Output/CategoriaOutputDTO";
import { plainToClass } from "class-transformer";

class CategoriaRepository extends QueriesCommon<CategoriaInputDTO, CategoriaOutputDTO>{

    constructor(
        public table = 'categoria'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): CategoriaOutputDTO[] {
        return rows.map((row) =>
            plainToClass(CategoriaOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllCategorias(): Promise<CategoriaOutputDTO[]> {
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

    public async getCategoriaById(id: any): Promise<CategoriaOutputDTO | null> {
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

    // public async insertCategoria(body: any): Promise<string> {
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

    // public async updateCategoria(id: any, body: any): Promise<string> {
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

    public async deleteCategoria(id: any): Promise<string> {
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

export default CategoriaRepository;
export const categoriaRepository = new CategoriaRepository();