import { RowDataPacket } from "mysql2";
import { dataSource } from "../config/ConnectDataSource"
import { Connection } from "../db/ConnectionDB"
import QueryParams from "../interfaces/QueryParamsInterface";

type DTO = { [key: string]: any };

abstract class QueriesCommon<InputDTO extends DTO, OutputDTO extends DTO> extends Connection {

    protected async getAll(queryParams: QueryParams): Promise<OutputDTO[]> {
        const connection = await dataSource.getConnection();
        const query = `
        SELECT ${queryParams.select ?? "*"}
        FROM ${queryParams.table}
        ${queryParams.joins ?? ""}
        ${queryParams.where ?? ""}
        ${queryParams.orderBy ?? ""}
        ${queryParams.limit ?? ""}`;

        try {
            const connect = await this.connect;
            const [rows] = await connect.query<RowDataPacket[]>(query);
            const dtos: OutputDTO[] = this.mapRowToDTO(rows);
            return dtos
        } catch (error) {
            console.error("Error executing query:", error);
            throw new Error("Error executing query");
        } finally {
            connection.release();
        }
    }

    protected async getOneById(id: number, queryParams: QueryParams): Promise<OutputDTO | null> {
        const connection = await dataSource.getConnection();
        const query = `
        SELECT ${queryParams.select ?? "*"}
        FROM ${queryParams.table}
        ${queryParams.joins ?? ""}
        WHERE ${queryParams.table}.id = ${queryParams.where ?? ""}
        `;

        try {
            const connect = await this.connect;
            const [rows] = await connect.query<RowDataPacket[]>(query, [id]);
            const dtos: OutputDTO[] = this.mapRowToDTO(rows);
            return dtos.length > 0 ? dtos[0] : null;
        } catch (error) {
            console.error("Error executing query:", error);
            throw new Error("Error executing query");
        } finally {
            connection.release();
        }
    }

    protected async insert(dto: InputDTO, queryParams: QueryParams): Promise<string> {
        const connection = await dataSource.getConnection();

        const columns = Object.keys(dto).join(",");
        const placeholders = Object.keys(dto).map(() => "?").join(",");
        const values = Object.values(dto);


        const query = `
            INSERT INTO ${queryParams.table} (${columns})
            VALUES (${placeholders})`;
        try {
            const connect = await this.connect;
            await connect.query<RowDataPacket[]>(query, values);
            return `Insertado correrctamente :D`;
        } catch (error) {
            console.error("Error executing query:", error);
            throw new Error("Error executing query");
        } finally {
            connection.release();
        }
    }

    protected async put(id: number, dto: InputDTO, queryParams: QueryParams): Promise<string> {
        const connection = await dataSource.getConnection();
        const columns = Object.keys(dto).join("=?, ") + "=?";
        const values = Object.values(dto);
        values.push(id);

        const query = `
            UPDATE ${queryParams.table}
            SET ${columns}
            WHERE id=?`;

        try {
            const connect = await this.connect;
            await connect.query<RowDataPacket[]>(query, values);
            return `Actualizado correctamente :D`;
        } catch (error) {
            console.error("Error executing query:", error);
            throw new Error("Error executing query");
        } finally {
            connection.release();
        }
    }

    protected async delete(queryParams: QueryParams): Promise<string> {
        const connection = await dataSource.getConnection();
        const query = `
        DELETE FROM ${queryParams.table}
        WHERE id = ${queryParams.where}`;
        try {
            const connect = await this.connect;
            await connect.query<RowDataPacket[]>(query, [queryParams.where]);
            return `${queryParams.table} eliminado correctamnte :D`;
        } catch (error) {
            console.error("Error executing query:", error);
            throw new Error("Error executing query");
        } finally {
            connection.release();
        }
    }

    protected abstract mapRowToDTO(rows: RowDataPacket[]): OutputDTO[];
}
export default QueriesCommon