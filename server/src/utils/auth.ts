import { ErrorCodeEnum } from "@/enums/error.enum";
import { ReqUserLoginType } from "@/types/user.types";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { verifyToken } from "./jwt";
import prisma from "@/models";

export const authentication = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ReqUserLoginType> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error(ErrorCodeEnum.INVALID_TOKEN);
  }

  const token = authorization.split("Bearer ")[1];

  if (!token) {
    throw new Error(ErrorCodeEnum.INVALID_TOKEN);
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
    throw new Error(ErrorCodeEnum.UNAUTHENTICATION);
  }

  return {
    id: user.id,
    username: user.username,
    email: user.username,
    roleId: user.roleId || "",
    roleName: user.role?.name || "",
  };
};
