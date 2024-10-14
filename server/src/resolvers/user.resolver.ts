import { excludeFields } from "../utils/excludeFields";
import {
  findUser,
  findUsers,
  registerUser,
  updateStatusVerifyUser,
} from "../models/user.model";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { ServerContext } from "@/types/server.types";
import { ErrorCodeEnum, generateInstanceError } from "@/utils/error.response";
import { ResponseType } from "@/types/response.types";
import { User } from "@prisma/client";
import { Resolvers } from "@/graphql/generated.resolver";
import { dateScalar } from "@/graphql/scalar/date.scalar";

type ResLoginType = {
  token: string;
  user: Omit<User, "password">;
};

export const userResolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    findUsers: async () => {
      const data = await findUsers();
      const users = data.map((user) => excludeFields(user, ["password"]));

      return {
        statusCode: 200,
        message: `Successfully retrieved data users`,
        data: users,
      };
    },
  },
};
