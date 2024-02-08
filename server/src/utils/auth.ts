import { ReqUserLoginType } from "@/types/user.types";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { verifyToken } from "./jwt";
import prisma from "@/models";
import { ErrorCodeEnum, generateInstanceError } from "./error.response";

export const authentication = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ReqUserLoginType> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw generateInstanceError({
      message: `Invalid Token`,
      code: ErrorCodeEnum.INVALID_TOKEN,
      statusCode: 401,
    });
  }

  const token = authorization.split("Bearer ")[1];

  if (!token) {
    throw generateInstanceError({
      message: `Invalid Token`,
      code: ErrorCodeEnum.INVALID_TOKEN,
      statusCode: 401,
    });
  }

  const decodedToken = verifyToken(token);

  const user = await prisma.user.findFirst({
    where: {
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw generateInstanceError({
      message: `Unauthentication`,
      code: ErrorCodeEnum.UNAUTHENTICATION,
      statusCode: 401,
    });
  }

  return {
    id: user.id,
    username: user.username,
    email: user.username,
    roleId: user.roleId || "",
    roleName: user.role?.name || "",
  };
};
