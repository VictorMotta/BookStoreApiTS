import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from '@/config/database';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(8);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      name: params.name || faker.name.fullName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

export const bodyUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
