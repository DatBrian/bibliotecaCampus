import App from './app';
import { autorRoutes } from './routes/AutorRoutes';
import { categoriaRoutes } from './routes/CategoriaRoutes';
import { editorialRoutes } from './routes/EditorialRoutes';
import { estadoRoutes } from './routes/EstadoRoutes';
import { libroRoutes } from './routes/LibroRoutes';
import { prestamoRoutes } from './routes/PrestamoRoutes';
import { reservaRoutes } from './routes/ReservaRoutes';

const app = new App([
    autorRoutes,
    categoriaRoutes,
    editorialRoutes,
    estadoRoutes,
    libroRoutes,
    prestamoRoutes,
    reservaRoutes
]);

app.listen();