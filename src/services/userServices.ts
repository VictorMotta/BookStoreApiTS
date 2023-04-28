import { User } from '@/protocols/types';
import errors from '@/errors/index';
import bcrypt from 'bcrypt';
import userRepositories from '@/repositories/userRepositories';
import jwt from 'jsonwebtoken';

async function signUp(user: User) {
  const { name, email, password } = user;
  const userFound = await userRepositories.findByEmail(email);

  if (userFound) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.signUp(name, email, hashPassword);
}

async function signIn(userParam: User) {
  const { email, password } = userParam;
  if (!email || !password) throw errors.badRequest();

  const user = await userRepositories.findByEmail(email);
  if (!user) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, { expiresIn: 86400 });

  return token;
}

export default {
  signUp,
  signIn,
};
