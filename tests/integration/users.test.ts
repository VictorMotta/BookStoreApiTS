import supertest from 'supertest';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { createUser } from '../factory/users-factory';
import userServices from '../../src/services/userServices';
import { faker } from '@faker-js/faker';
import errors from '../../src/errors';
import httpStatus from 'http-status';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('createUser', () => {
  it('should throw duplicatedEmailError if there is a user with given email', async () => {
    const existingUser = await createUser();

    const response = await server.post('/users/signup').send({
      name: faker.name.fullName(),
      email: existingUser.email,
      password: faker.internet.password(8),
    });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});
