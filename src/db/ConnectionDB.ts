import { dataSource } from "../config/ConnectDataSource";
import { PoolConnection } from "mysql2/promise";

abstract class Connection {
    get connect(): Promise<PoolConnection> {
        return dataSource.getConnection();
    }
}

export { Connection };