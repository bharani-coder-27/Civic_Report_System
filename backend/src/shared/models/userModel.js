import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function createUser({ name, email, phone, password, role }) {
  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      phone,
      password_hash: hash,
      role,
    },
  });
}

export const findUserByEmailOrPhone = async (identifier) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { phone: identifier }]
    }
  });
};

export async function validatePassword(user, password) {
  return bcrypt.compare(password, user.password_hash);
}


/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

 */