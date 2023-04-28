import supertest from 'supertest';
import app from '@/app';
import { cleanDb } from '../helpers';
import { bodyUser, createUser } from '../factory/users-factory';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import prisma from '@/config/database';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /users/signup', () => {
  it('should respond with status 409 if there is a user with given email', async () => {
    const existingUser = await createUser();

    const response = await server.post('/users/signup').send({
      name: faker.name.fullName(),
      email: existingUser.email,
      password: faker.internet.password(8),
    });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
  it('should respond with status 409 if not pass a name', async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await server.post('/users/signup').send(newUser);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it('should respond with status 409 if not pass a email', async () => {
    const newUser = {
      name: faker.name.fullName(),
      password: faker.internet.password(10),
    };

    const response = await server.post('/users/signup').send(newUser);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it('should respond with status 409 if not pass a password', async () => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };

    const response = await server.post('/users/signup').send(newUser);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it('should respond with status 409 if pass wrong email', async () => {
    const newUser = {
      name: faker.name.fullName(),
      email: 'victor',
      password: faker.internet.password(10),
    };

    const response = await server.post('/users/signup').send(newUser);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it('should respond with status 201 if body is right', async () => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(10),
    };

    const response = await server.post('/users/signup').send(newUser);

    const insertedUser = await prisma.user.findFirst({
      where: {
        email: newUser.email,
      },
    });

    expect(insertedUser.email).toEqual(newUser.email);
    expect(insertedUser.name).toEqual(newUser.name);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
});

describe('POST /users/signin', () => {
  it('should respond with 401 when body is not given', async () => {
    const response = await server.post('/users/signin');

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });
  it('should respond with 401 when user not exist', async () => {
    const response = await server.post('/users/signin').send(bodyUser);

    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with 401 if password is wrong', async () => {
    const user = await createUser({ password: '123456789' });
    const response = await server
      .post('/users/signin')
      .send({ email: user.email, password: '12345678' });

    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with 401 if password is wrong', async () => {
    const user = await createUser({ password: '123456789' });
    const response = await server
      .post('/users/signin')
      .send({ email: user.email, password: '12345678' });

    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with 200 when all is right', async () => {
    const user = await createUser({ password: '12345678' });
    const response = await server
      .post('/users/signin')
      .send({ email: user.email, password: '12345678' });

    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
