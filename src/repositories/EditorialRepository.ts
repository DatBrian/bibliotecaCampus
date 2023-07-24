import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import EditorialInputDTO from "../model/dto/Input/EditorialInputDTO";
import EditorialOutputDTO from "../model/dto/Output/EditorialOutputDTO";
import { plainToClass } from "class-transformer";

class EditorialRepository extends QueriesCommon<EditorialInputDTO, EditorialOutputDTO>{

    constructor(
        public table = 'editorial'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): EditorialOutputDTO[] {
        return rows.map((row) =>
            plainToClass(EditorialOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllEditorials(): Promise<EditorialOutputDTO[]> {
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

    public async getEditorialById(id: any): Promise<EditorialOutputDTO | null> {
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

    // public async insertEditorial(body: any): Promise<string> {
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

    // public async updateEditorial(id: any, body: any): Promise<string> {
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

    public async deleteEditorial(id: any): Promise<string> {
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

export default EditorialRepository;
export const editorialRepository = new EditorialRepository();