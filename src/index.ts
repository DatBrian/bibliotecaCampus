import App from './app';
import { autorRoutes } from './routes/AutorRoutes';

const app = new App([
    autorRoutes
]);

app.listen();