import jwt from "jsonwebtoken";
import config from "@/config";
import { UserRoleEnum } from "@prisma/client";

type JWTPayloadType = {
  id: string;
  username: string;
  email: string;
  roleId?: string;
  roleCode?: UserRoleEnum;
};

export const generateToken = (payload: JWTPayloadType) => {
  return jwt.sign(payload, config.JWT_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET) as JWTPayloadType;
};
