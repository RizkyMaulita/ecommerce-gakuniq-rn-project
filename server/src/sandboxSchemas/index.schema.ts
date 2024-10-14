import { cartResolvers, cartTypeDefs } from "./cart.schema";
import { categoryResolvers, categoryTypeDefs } from "./category.schema";
import { productResolvers, productTypeDefs } from "./product.schema";
import responseTypeDefs from "./response.schema";
import { userResolvers, userTypeDefs } from "./user.schema";

export const typeDefs = [
  responseTypeDefs,
  userTypeDefs,
  productTypeDefs,
  categoryTypeDefs,
  cartTypeDefs,
];

export const resolvers = [
  userResolvers,
  productResolvers,
  categoryResolvers,
  cartResolvers,
];
