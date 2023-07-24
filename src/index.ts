import App from './app';
import { autorRoutes } from './routes/AutorRoutes';
import { categoriaRoutes } from './routes/CategoriaRoutes';

const app = new App([
    autorRoutes,
    categoriaRoutes
]);

app.listen();