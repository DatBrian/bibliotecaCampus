import { RowDataPacket } from "mysql2/promise";
import QueriesCommon from "../common/QueriesCommon";
import LibroInputDTO from "../model/dto/Input/LibroInputDTO";
import LibroOutputDTO from "../model/dto/Output/LibroOutputDTO";
import { plainToClass } from "class-transformer";

class LibroRepository extends QueriesCommon<LibroInputDTO, LibroOutputDTO>{

    constructor(
        public table = 'libro'
    ) {
        super();
    }

    protected mapRowToDTO(rows: RowDataPacket[]): LibroOutputDTO[] {
        return rows.map((row) =>
            plainToClass(LibroOutputDTO, row, { excludeExtraneousValues: true })
        );
    }

    public async getAllLibros(): Promise<LibroOutputDTO[]> {
        const queryParams = {
            select: `${this.table}.*, autor.nombre AS autor, categoria.nombre AS categoria, editorial.nombre AS editorial`,
            table: this.table,
            joins: `JOIN autor ON autor.id_autor = ${this.table}.id_autor
                    JOIN categoria ON categoria.id_categoria = ${this.table}.id_categoria
                    JOIN editorial ON editorial.id_editorial = ${this.table}.id_editorial`
        };
        try {
            return await this.getAll(queryParams);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    public async getLibroById(id: any): Promise<LibroOutputDTO | null> {
        const queryParams = {
            select: `${this.table}.*, autor.nombre AS autor, categoria.nombre AS categoria, editorial.nombre AS editorial`,
            table: this.table,
            joins: `JOIN autor ON autor.id_autor = ${this.table}.id_autor
                    JOIN categoria ON categoria.id_categoria = ${this.table}.id_categoria
                    JOIN editorial ON editorial.id_editorial = ${this.table}.id_editorial`,
            where: id.toString()
        };
        try {
            return await this.getOneById(id, queryParams);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    // public async insertLibro(body: any): Promise<string> {
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

    // public async updateLibro(id: any, body: any): Promise<string> {
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

    public async deleteLibro(id: any): Promise<string> {
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

export default LibroRepository;
export const libroRepository = new LibroRepository();