import { Router } from 'express';
import userRoutes from './userRoutes';
import bookRoutes from './bookRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/books', bookRoutes);

export default routes;
