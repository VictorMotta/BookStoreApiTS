import { Router } from 'express';
import authValidation from '../middlewares/authValidation';
import bookControllers from '../controllers/bookControllers';
import { bookSchema } from '../schemas/booksSchema';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';

const bookRoutes = Router();

bookRoutes
  .all('/*', authValidation)
  .get('/', bookControllers.findAll)
  .get('/my-books', bookControllers.findAllMyBooks)
  .post('/', validateSchema(bookSchema), bookControllers.create)
  .post('/take-book/:id', bookControllers.takeBook);

export default bookRoutes;
