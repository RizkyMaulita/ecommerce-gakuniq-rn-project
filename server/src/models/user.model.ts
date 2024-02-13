import { Prisma, UserRoleEnum, UserVerifyStatusEnum } from "@prisma/client";
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
      statusVerify: UserVerifyStatusEnum.PENDING,
      password: hashPassword(data.password),
      roleId: findRole?.id || null,
      addressess: [],
      createdAt: new Date(),
    } as Prisma.UserCreateInput,
    include: {
      role: true,
    },
  });

  return createdUser;
};

export const updateStatusVerifyUser = async (
  userId: string,
  status: UserVerifyStatusEnum
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      statusVerify: status,
    },
  });

  return user;
};

export const findUsers = async () => {
  return await prisma.user.findMany();
};

export const findUser = async (queryFilter: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({
    where: queryFilter,
    include: {
      role: true,
    },
  });
};
