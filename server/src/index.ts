import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import responseTypeDefs from "./schemas/response";
import { userResolvers, userTypeDefs } from "./schemas/user";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ErrorCodeEnum } from "./enums/error.enum";
import { authentication } from "./utils/auth";
import { ServerContext } from "./types/server.types";
import { productResolvers, productTypeDefs } from "./schemas/products";
import { categoryTypeDefs, categoryResolvers } from "./schemas/category";

const server = new ApolloServer<ServerContext>({
  typeDefs: [userTypeDefs, responseTypeDefs, productTypeDefs, categoryTypeDefs],
  resolvers: [userResolvers, productResolvers, categoryResolvers],
  formatError: (formattedError: GraphQLFormattedError, _error: any) => {
    let statusCode = 500;
    let message = formattedError.message;

    if (
      [ErrorCodeEnum.INVALID_LOGIN, ErrorCodeEnum.INVALID_TOKEN].includes(
        formattedError.extensions.code as ErrorCodeEnum
      )
    ) {
      statusCode = 401;
    } else if (_error.message === ErrorCodeEnum.INVALID_LOGIN) {
      statusCode = 401;
      message = `Invalid username / password`;
    } else if (_error.message === ErrorCodeEnum.INVALID_TOKEN) {
      statusCode = 401;
      message = `Invalid Token`;
    }

    throw new GraphQLError(message, {
      extensions: {
        code: formattedError.extensions.code,
        http: {
          status: statusCode,
        },
      },
    });
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async (args) => {
    return {
      authN: () => authentication(args),
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
