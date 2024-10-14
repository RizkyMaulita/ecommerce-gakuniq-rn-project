import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authentication } from "./utils/auth";
// import { ServerContext } from "./types/server.types";
// import { resolvers, typeDefs } from "./schemas/index.schema";
// import {} from ''
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { ServerContext } from "./types/server.types";
import resolvers from "./resolvers";

const server = new ApolloServer<ServerContext>({
  typeDefs: mergeTypeDefs(loadFilesSync("./src/schemas/**/*.graphql")),
  resolvers: resolvers,
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
