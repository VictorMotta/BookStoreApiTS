import { ErrorType, ErrorTypeForEmail } from '@/protocols/types';

function conflictError(message: string | string[]): ErrorType {
  return {
    name: 'ConflictError',
    message,
  };
}

function duplicatedEmailError(email: string): ErrorTypeForEmail {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
    email,
  };
}

function unauthorizedError(): ErrorType {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

function notFoundError(): ErrorType {
  return {
    name: 'NotFoundError',
    message: 'No result for this search!',
  };
}

function invalidCredentialsError(): ErrorType {
  return {
    name: 'InvalidCredentialsError',
    message: 'Email or password are incorrect',
  };
}

function badRequest(): ErrorType {
  return {
    name: 'BadRequest',
    message: 'Something went wrong',
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  badRequest,
};
