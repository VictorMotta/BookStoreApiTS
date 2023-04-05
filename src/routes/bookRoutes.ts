import { Router } from 'express';
import authValidation from '../middlewares/authValidation.js';
import bookControllers from '../controllers/bookControllers.js';
import { bookSchema } from '../schemas/booksSchema.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';

const bookRoutes = Router();

bookRoutes.get('/', authValidation, bookControllers.findAll);
bookRoutes.get('/my-books', authValidation, bookControllers.findAllMyBooks);
bookRoutes.post('/', authValidation, validateSchema(bookSchema), bookControllers.create);
bookRoutes.post('/take-book/:id', authValidation, bookControllers.takeBook);

export default bookRoutes;
