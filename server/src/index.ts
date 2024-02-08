import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authentication } from "./utils/auth";
import { ServerContext } from "./types/server.types";
import { resolvers, typeDefs } from "./schemas/index.schema";

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
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
