import prisma from "../models";
import { excludeFields } from "../utils/excludeFields";
import { registerUser } from "../models/user";
import { ErrorCodeEnum } from "@/enums/error.enum";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { ServerContext } from "@/types/server.types";

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
    addresses: [Address]
    roleId: ID
    role: UserRole 
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
    register(payload: RegisterInput): ResponseUser
    login(username: String!, password: String!): ResponseLogin
  } 
`;

export const userResolvers = {
  Query: {
    findUsers: async () => {
      const data = await prisma.user.findMany();
      const users = data.map((user) => excludeFields(user, ["password"]));

      return {
        statusCode: 200,
        message: `Successfully retrieved data users`,
        data: users,
      };
    },
    getMyProfile: async (_, _args, { authN }: ServerContext) => {
      const userLogin = await authN();

      const user = await prisma.user.findFirst({
        where: { id: userLogin.id },
        include: { role: true },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data my profile`,
        data: excludeFields(user, ["password"]),
      };
    },
  },
  Mutation: {
    register: async (_, { payload }) => {
      const user = await registerUser(
        {
          ...payload,
          dob: payload.dob ? new Date(payload.dob) : null,
        },
        "CUSTOMER"
      );

      return {
        statusCode: 201,
        message: `Successfully register new user`,
        data: excludeFields(user, ["password"]),
      };
    },
    login: async (_, { username, password }) => {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: username,
            },
            { username },
          ],
        },
        include: { role: true },
      });

      if (!user) {
        throw new Error(ErrorCodeEnum.INVALID_LOGIN);
      }

      if (!comparePassword(password, user.password)) {
        throw new Error(ErrorCodeEnum.INVALID_LOGIN);
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
  },
};
