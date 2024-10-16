import {
  Address,
  Prisma,
  UserRoleEnum,
  UserVerifyStatusEnum,
} from "@prisma/client";
import prisma from ".";
import { hashPassword } from "@/utils/bcrypt";
import { ErrorCodeEnum, generateInstanceError } from "@/utils/error.response";

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

export const addMyAddress = async (
  userId: string,
  payload: Prisma.AddressCreateInput
) => {
  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw generateInstanceError({
      message: `Invalid User`,
      code: ErrorCodeEnum.INVALID_LOGIN,
      statusCode: 401,
    });
  }

  const findAddress = findUser.addressess?.find(
    (address) =>
      // for unique between address
      address.contactName === payload.contactName &&
      address.contactPhoneNumber === payload.contactPhoneNumber &&
      address.zipCode === payload.zipCode
  );

  if (findAddress) {
    throw generateInstanceError({
      message: `The contact for this postal code is already registered`,
      code: ErrorCodeEnum.BAD_REQUEST,
      statusCode: 400,
    });
  }

  return await prisma.user.update({
    data: {
      addressess: {
        push: payload,
      },
    },
    where: { id: userId },
    omit: {
      password: true,
    },
  });
};
