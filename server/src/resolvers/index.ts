import { Resolvers } from "@/graphql/generated.resolver";
import _ from "lodash";
import { productResolvers } from "./product.resolver";
import { userResolvers } from "./user.resolver";

const resolvers: Resolvers = _.merge(productResolvers, userResolvers);

export default resolvers;
