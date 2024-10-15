import { ErrorCodeEnum, generateInstanceError } from "@/utils/error.response";
import prisma from ".";
import {
  Cart,
  OrderDetail,
  OrderStatusEnum,
  Prisma,
  Product,
} from "@prisma/client";

type QueryOrderParamsType = {
  queryFilter?: Prisma.OrderWhereInput;
  excludeFields?: Prisma.OrderOmit;
  limit?: number;
  offset?: number;
  include?: Prisma.OrderInclude;
};

export const findOrders = async ({
  queryFilter,
  include,
}: QueryOrderParamsType) => {
  return await prisma.order.findMany({
    where: queryFilter,
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
      ...include,
    },
  });
};

export const findOrder = async ({
  queryFilter,
  include,
}: QueryOrderParamsType) => {
  return await prisma.order.findFirst({
    where: queryFilter,
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
      ...include,
    },
  });
};

export const createDraftOrder = async (userId: string, cartIds: string[]) => {
  return await createNewOrder(userId, cartIds, "DRAFT");
};

export const upsertOrder = async ({
  orderId,
  cartIds,
  userId,
  address,
  shippingExpCode,
  shippingExpService,
  shippingExpPrice,
}: Partial<Prisma.OrderUncheckedCreateInput> & {
  orderId?: string;
  cartIds?: string[];
}) => {
  if (!orderId && !cartIds.length) {
    throw generateInstanceError({
      message: `OrderId or CartIds can't be empty`,
      code: ErrorCodeEnum.BAD_REQUEST,
      statusCode: 400,
    });
  }

  if (orderId) {
    const order = await prisma.$transaction(async (trx) => {
      const findOrder = await trx.order.findFirst({
        where: {
          id: orderId,
          userId,
          status: "DRAFT",
        },
        include: {
          orderDetails: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  stock: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      if (!findOrder) {
        throw generateInstanceError({
          message: `Order with ID ${orderId} Not Found`,
          code: ErrorCodeEnum.NOT_FOUND,
          statusCode: 404,
        });
      }

      const updatedOrder = await trx.order.update({
        data: {
          status: "CREATED",
          address,
          shippingExpCode,
          shippingExpService,
          shippingExpPrice,
          totalPrice: findOrder.totalPrice + shippingExpPrice,
          updatedAt: new Date(),
        },
        where: { id: orderId },
      });

      for await (const orderDetail of findOrder.orderDetails) {
        validateProduct({ orderDetail, product: orderDetail.product });

        await trx.product.update({
          data: {
            stock: orderDetail.product?.stock - orderDetail.quantity,
            updatedAt: new Date(),
          },
          where: { id: orderDetail.productId },
        });
      }

      return updatedOrder;
    });

    return order;
  }

  return await createNewOrder(userId, cartIds, "CREATED", {
    address,
    shippingExpCode,
    shippingExpPrice,
    shippingExpService,
  });
};

export const createNewOrder = async (
  userId: string,
  cartIds: string[],
  status: OrderStatusEnum,
  dataOrder: Partial<Prisma.OrderUncheckedCreateInput> = {}
) => {
  if (!cartIds.length) {
    throw generateInstanceError({
      message: `CartIds can't be empty`,
      code: ErrorCodeEnum.BAD_REQUEST,
      statusCode: 400,
    });
  }

  if (status != OrderStatusEnum.DRAFT && status != OrderStatusEnum.CREATED) {
    throw generateInstanceError({
      message: `Order Status Invalid`,
      code: ErrorCodeEnum.BAD_REQUEST,
      statusCode: 400,
    });
  }

  const { totalPrice, data: findCarts } = await findCartProducts(
    cartIds,
    userId,
    true
  );

  const newOrder = await prisma.$transaction(async (trx) => {
    const order = await trx.order.create({
      data: {
        userId,
        totalPrice,
        totalProductPrice: totalPrice + (dataOrder?.shippingExpPrice || 0),
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dataOrder,
      },
    });

    await trx.orderDetail.createMany({
      data: findCarts.map((cart) => {
        return {
          productId: cart.productId,
          orderId: order.id,
          userId: cart.userId,
          quantity: cart.quantity,
          price: cart.product.price,
          totalPrice: cart.product.price * cart.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    });

    await trx.cart.updateMany({
      data: {
        isActive: false,
      },
      where: {
        id: {
          in: findCarts.map((cart) => cart.id),
        },
      },
    });

    if (status === OrderStatusEnum.CREATED) {
      /*
        Assume:
          - While status DRAFT, Stock Product isn't reduced
          - Stock Product just reduced, while order is created
      */
      for await (const cart of findCarts) {
        await trx.product.update({
          data: {
            stock: cart.product?.stock - cart.quantity,
            updatedAt: new Date(),
          },
          where: { id: cart.productId },
        });
      }
    }

    return order;
  });

  return newOrder;
};

export const findCartProducts = async (
  cartIds: string[],
  userId: string,
  isValidateProduct?: boolean
) => {
  const findCarts = await prisma.cart.findMany({
    where: {
      userId,
      id: {
        in: cartIds,
      },
    },
    include: { product: true },
  });

  if (!findCarts.length) {
    throw generateInstanceError({
      message: `Cart Not Found`,
      code: ErrorCodeEnum.NOT_FOUND,
      statusCode: 404,
    });
  }

  let totalPrice = 0;

  findCarts.forEach((cart) => {
    if (isValidateProduct) validateProduct({ cart, product: cart.product });

    totalPrice += cart.quantity * cart.product.price;
  });

  return {
    totalPrice,
    data: findCarts,
  };
};

const validateProduct = ({
  cart,
  orderDetail,
  product,
}: {
  cart?: Cart;
  orderDetail?: OrderDetail;
  product?: Partial<Product>;
}) => {
  if (!product) {
    throw generateInstanceError({
      message: `Product Not Found`,
      code: ErrorCodeEnum.NOT_FOUND,
      statusCode: 404,
    });
  }

  if (cart?.quantity > product.stock || orderDetail?.quantity > product.stock) {
    throw generateInstanceError({
      message: `Product ${product.name} Out Of Stock`,
      code: ErrorCodeEnum.BAD_REQUEST,
      statusCode: 400,
    });
  }

  return;
};
