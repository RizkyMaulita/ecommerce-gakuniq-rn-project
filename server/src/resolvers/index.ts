import { Resolvers } from "@/graphql/generated.resolver";
import _ from "lodash";
import { productResolvers } from "./product.resolver";
import { userResolvers } from "./user.resolver";
import { dateScalar } from "@/graphql/scalar/date.scalar";
import { categoryResolvers } from "./category.resolver";
import { cartResolvers } from "./cart.resolver";

const dateResolver: Resolvers = {
  Date: dateScalar,
};

const resolvers: Resolvers = _.merge(
  dateResolver,
  productResolvers,
  userResolvers,
  categoryResolvers,
  cartResolvers
);

export default resolvers;
