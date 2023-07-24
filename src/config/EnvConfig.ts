import { DotenvConfigOutput, config } from 'dotenv';
import chalk from "chalk";

const result: DotenvConfigOutput = config();

result.error
    ? (console.error('Error al cargar las variables de entorno:', result.error), process.exit(1))
    : console.log(chalk.bgMagenta.black('💻 Variables de entorno cargadas correctamente!!🔐 '));;

const env: Record<string, string | undefined> = { ...result.parsed };

delete process.env['DOTENV_CONFIG'];

export default env;