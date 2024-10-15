import { Resolvers } from "@/graphql/generated.resolver";
import {
  createDraftOrder,
  findOrder,
  findOrders,
  upsertOrder,
} from "@/models/order.model";

export const orderResolvers: Resolvers = {
  Query: {
    getMyOrders: async (_, { status }, { authN }) => {
      const userLogin = await authN();

      const orders = await findOrders({
        queryFilter: status
          ? {
              userId: userLogin.id,
              status,
            }
          : {
              userId: userLogin.id,
            },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved my orders`,
        data: orders,
      };
    },
    getMyOrderDetail: async (_, { orderId }, { authN }) => {
      const userLogin = await authN();

      const order = await findOrder({
        queryFilter: {
          id: orderId,
          userId: userLogin.id,
        },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved my order detail`,
        data: order,
      };
    },
  },
  Mutation: {
    createDraftOrder: async (_, { cartIds }, { authN }) => {
      const userLogin = await authN();

      const order = await createDraftOrder(userLogin.id, cartIds);

      return {
        statusCode: 200,
        message: `Successfully create draft order`,
        data: order,
      };
    },
    upsertOrder: async (_, { payload }, { authN }) => {
      const userLogin = await authN();

      const order = await upsertOrder({
        ...payload,
        userId: userLogin.id,
      });

      return {
        statusCode: 200,
        message: `Successfully create order`,
        data: order,
      };
    },
  },
};
