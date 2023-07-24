import App from './app';
import { autorRoutes } from './routes/AutorRoutes';
import { categoriaRoutes } from './routes/CategoriaRoutes';
import { editorialRoutes } from './routes/EditorialRoutes';
import { estadoRoutes } from './routes/EstadoRoutes';

const app = new App([
    autorRoutes,
    categoriaRoutes,
    editorialRoutes,
    estadoRoutes
]);

app.listen();