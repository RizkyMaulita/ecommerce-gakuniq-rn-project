import { Prisma, UserRoleEnum } from "@prisma/client";
import prisma from ".";
import { hashPassword } from "@/utils/bcrypt";

export const registerUser = async (
  data: Prisma.UserCreateInput,
  role: UserRoleEnum
) => {
  const findRole = await prisma.userRole.findFirst({ where: { code: role } });

  const createdUser = await prisma.user.create({
    data: {
      ...data,
      password: hashPassword(data.password),
      roleId: findRole?.id || null,
      addressess: [],
    } as Prisma.UserCreateInput,
  });

  return createdUser;
};
