import { excludeFields } from "../utils/excludeFields";
import {
  findUser,
  findUsers,
  registerUser,
  updateStatusVerifyUser,
} from "../models/user.model";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { ErrorCodeEnum, generateInstanceError } from "@/utils/error.response";
import { Resolvers } from "@/graphql/generated.resolver";

export const userResolvers: Resolvers = {
  Query: {
    findUsers: async () => {
      const data = await findUsers({
        excludeFields: {
          password: true,
        },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data users`,
        data,
      };
    },
    getMyProfile: async (_, _args, { authN }) => {
      const userLogin = await authN();

      const user = await findUser({
        queryFilter: { id: userLogin.id },
        excludeFields: { password: true },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data my profile`,
        data: user,
      };
    },
  },
  Mutation: {
    register: async (_, { payload }) => {
      const { username, email } = payload;
      const isExistUser = await findUser({
        queryFilter: {
          OR: [{ email }, { username }],
        },
      });

      if (isExistUser) {
        throw generateInstanceError({
          message: `${
            isExistUser.username === username ? "Username" : "Email"
          } has been exist`,
          code: ErrorCodeEnum.BAD_REQUEST,
          statusCode: 400,
        });
      }

      const newUser = await registerUser({
        ...payload,
        dob: payload.dob ? new Date(payload.dob) : null,
      });

      const token = generateToken({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roleId: newUser.roleId || "",
        roleCode: newUser.role?.code,
      });

      return {
        statusCode: 201,
        message: `Successfully register new user`,
        data: {
          token,
          user: excludeFields(newUser, ["password"]),
        },
      };
    },
    login: async (_, { username, password }) => {
      const user = await findUser({
        queryFilter: {
          OR: [{ email: username }, { username }],
        },
      });

      if (!user || !comparePassword(password, user?.password)) {
        throw generateInstanceError({
          message: "Invalid username / password",
          code: ErrorCodeEnum.INVALID_LOGIN,
          statusCode: 401,
        });
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId || "",
        roleCode: user.role?.code,
      });

      return {
        statusCode: 200,
        message: `Successfully login !`,
        data: {
          token,
          user: excludeFields(user, ["password"]),
        },
      };
    },
    updateVerifyStatus: async (_, { status }, { authN }) => {
      const userLogin = await authN();

      const user = await updateStatusVerifyUser(userLogin.id, status);

      return {
        statusCode: 200,
        message: `Successfully update status user`,
        data: excludeFields(user, ["password"]),
      };
    },
  },
};
