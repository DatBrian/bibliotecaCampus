import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import env from "./EnvConfig";

class DataSource {
    private pool: Pool;

    constructor() {
        this.pool = createPool({
            host: env.DB_HOST,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_NAME
        });
    }

    async getConnection(): Promise<PoolConnection> {
        try {
            const connection = await this.pool.getConnection();
            return connection;
        } catch (error) {
            throw error;
        }
    }
}
export const dataSource: DataSource = new DataSource();