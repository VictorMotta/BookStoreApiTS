import { Router } from 'express';
import authValidation from '../middlewares/authValidation.js';
import bookControllers from '../controllers/bookControllers.js';
import { bookSchema } from '../schemas/booksSchema.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';

const bookRoutes = Router();

bookRoutes
  .all('/*', authValidation)
  .get('/', bookControllers.findAll)
  .get('/my-books', bookControllers.findAllMyBooks)
  .post('/', validateSchema(bookSchema), bookControllers.create)
  .post('/take-book/:id', bookControllers.takeBook);

export default bookRoutes;
