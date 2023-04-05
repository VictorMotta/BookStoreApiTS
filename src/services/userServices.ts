import { User } from '../protocols/types.js';
import errors from '../errors/index.js';
import bcrypt from 'bcrypt';
import userRepositories from '../repositories/userRepositories.js';
import jwt from 'jsonwebtoken';

async function signUp(user: User) {
  const { name, email, password } = user;
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.signUp(name, email, hashPassword);
}

async function signIn(userParam: User) {
  const { email, password } = userParam;
  const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, { expiresIn: 86400 }); // A chave secreta é um hash SHA-256

  return token;
}

export default {
  signUp,
  signIn,
};