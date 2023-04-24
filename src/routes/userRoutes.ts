import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import { validateSchema } from '../middlewares/schemaValidationMiddleware';
import { userSchema } from '../schemas/usersSchemas';

const userRoutes = Router();

userRoutes
  .post('/signup', validateSchema(userSchema), userControllers.signUp)
  .post('/signin', userControllers.signIn);

export default userRoutes;
