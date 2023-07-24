import express, { Application } from "express";
import { RoutesInterface } from "./interfaces/RoutesInterface";
import routemap from "express-routemap";
import env from "./config/EnvConfig";
import chalk from "chalk";
import { PoolConnection } from "mysql2/promise";
import { Connection } from "./db/ConnectionDB";
import cookieParser from 'cookie-parser';


class App extends Connection {
    public app: Application;
    public port: number;
    public server: any;

    constructor(routes: RoutesInterface[]) {
        super();
        this.app = express();
        this.port = Number(env.PORT) || 5000;
        this.initMiddlewares();
        this.initRoutes(routes);
        this.initConnection();
    }

    public getServer() {
        return this.app;
    }

    public closeServer(done?: any) {
        this.server = this.app.listen(this.port, () => {
            done();
        });
    }

    private async initConnection(): Promise<PoolConnection> {
        try {
            const connection = await this.connect;
            console.log(chalk.bgGreen.black('✔️  Conexión establecida 🔌 '));
            console.log(chalk.blue('---------------------------------------------------------------------------------'));
            console.log(chalk.green.bold(`🌐 ¡Se ha establecido la conexión a: ${env.DB_NAME} en el host: ${env.DB_HOST}!`));
            console.log(chalk.blue('---------------------------------------------------------------------------------'));
            return connection;

        } catch (error) {
            console.error(chalk.bgRed.white('❌ Error al establecer la conexión:'));
            console.error(error);
            throw new Error('Error al establecer la conexión');
        }
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private initRoutes(routes: RoutesInterface[]) {
        routes.forEach((route) => {
            this.app.use(`/api/${env.API_VERSION}`, route.router)
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log();
            console.log(chalk.bgCyan.white.bold('🗺️  Rutas disponibles: 🚴 '));
            routemap(this.app);
            console.log(chalk.bgGreen.black('✨ Servidor en línea ✨ '));
            console.log(chalk.blue('--------------------------------------------------------------------------------'));
            console.log(chalk.green.bold(`🚀 ¡El servidor se ha levantado exitosamente en http://${env.HOST}:${env.PORT}!`));
            console.log(chalk.blue('--------------------------------------------------------------------------------'));
        })
    }
}
export default App;