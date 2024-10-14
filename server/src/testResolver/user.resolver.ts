import { Resolvers } from "./index.resolver";

// export const resolvers: Resolvers = {
//   Query: {
//     findUserRoles: () => {
//       return [{ id: "1", name: "test" }];
//     },
//   },
// };

export const res: Resolvers["Query"] = {
  findUserRoles: (_, args, context) => {
    // context.authN()
    return [];
  },
};
