import { Prisma, UserRoleEnum, UserVerifyStatusEnum } from "@prisma/client";
import prisma from ".";
import { hashPassword } from "@/utils/bcrypt";

type QueryUserParamsType = {
  queryFilter?: Prisma.UserWhereInput;
  excludeFields?: Prisma.UserOmit;
  limit?: number;
  offset?: number;
  include?: Prisma.UserInclude;
};

export const registerUser = async (
  data: Prisma.UserCreateInput,
  role: UserRoleEnum = UserRoleEnum.CUSTOMER
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

export const findUsers = async ({ excludeFields }: QueryUserParamsType) => {
  return await prisma.user.findMany({
    omit: excludeFields,
  });
};

export const findUser = async ({
  queryFilter,
  include,
}: QueryUserParamsType) => {
  return await prisma.user.findFirst({
    where: queryFilter,
    include,
  });
};
