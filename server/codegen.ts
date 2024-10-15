import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schemas/**/*.graphql",
  generates: {
    "src/graphql/generated.resolver.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../types/server.types#ServerContext",
        scalars: {
          Date: "Date",
        },
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
