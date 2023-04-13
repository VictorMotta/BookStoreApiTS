import { Router } from 'express';
import userControllers from '../controllers/userControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { userSchema } from '../schemas/usersSchemas.js';

const userRoutes = Router();

userRoutes
  .post('/signup', validateSchema(userSchema), userControllers.signUp)
  .post('/signin', userControllers.signIn);

export default userRoutes;
