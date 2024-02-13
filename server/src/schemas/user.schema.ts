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

type ResLoginType = {
  token: string;
  user: Omit<User, "password">;
};

export const userTypeDefs = `#graphql
  type UserRole {
    id: ID
    name: String
    code: String
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
    fullName: String
    imgUrl: String
    phoneNumber: String
    dob: String
    statusVerify: UserVerifyStatusEnum
    addresses: [Address]
    roleId: ID
    role: UserRole 
    createdAt: String
    updatedAt: String
  }

  type Address {
    address: String
    provinceId: ID 
    cityId: ID
    subDistrictId: ID
    zipCode: ID
    latitude: Float
    longitude: Float
    benchmark: String   #patokan
    contactName: String
    phoneNumber: String
    tag: AddressTagEnum
    isMainAddress: Boolean
  }
  
  enum AddressTagEnum {
    OFFICE
    HOME
  }

  enum UserVerifyStatusEnum {
    PENDING
    VERIFIED
    NOT_VERIFIED
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    fullName: String
    imgUrl: String
    phoneNumber: String
    dob: String
  }

  type Query {
    findUsers: ResponseUsers
    getMyProfile: ResponseUser
  }

  type Mutation {
    register(payload: RegisterInput): ResponseLogin
    login(username: String!, password: String!): ResponseLogin
    updateVerifyStatus(status: UserVerifyStatusEnum!): ResponseUser
  } 
`;

export const userResolvers = {
  Query: {
    findUsers: async (): Promise<ResponseType<Omit<User, "password">[]>> => {
      const data = await findUsers();
      const users = data.map((user) => excludeFields(user, ["password"]));

      return {
        statusCode: 200,
        message: `Successfully retrieved data users`,
        data: users,
      };
    },
    getMyProfile: async (
      _,
      _args,
      { authN }: ServerContext
    ): Promise<ResponseType<Omit<User, "password">>> => {
      const userLogin = await authN();

      const user = await findUser({ id: userLogin.id });

      return {
        statusCode: 200,
        message: `Successfully retrieved data my profile`,
        data: excludeFields(user, ["password"]),
      };
    },
  },
  Mutation: {
    register: async (_, { payload }): Promise<ResponseType<ResLoginType>> => {
      const { username, email } = payload;
      const isExistUser = await findUser({
        OR: [{ email }, { username }],
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

      const user = await registerUser(
        {
          ...payload,
          dob: payload.dob ? new Date(payload.dob) : null,
        },
        "CUSTOMER"
      );

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId || "",
        roleCode: user.role?.code,
      });

      return {
        statusCode: 201,
        message: `Successfully register new user`,
        data: {
          token,
          user: excludeFields(user, ["password"]),
        },
      };
    },
    login: async (
      _,
      { username, password }
    ): Promise<ResponseType<ResLoginType>> => {
      const user = await findUser({
        OR: [{ email: username }, { username }],
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
    updateVerifyStatus: async (
      _,
      { status },
      { authN }: ServerContext
    ): Promise<ResponseType<Omit<User, "password">>> => {
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
