import { ErrorCodeEnum, generateInstanceError } from "@/utils/error.response";
import prisma from ".";

export const findCarts = async (userId: string) => {
  return await prisma.cart.findMany({
    where: {
      userId,
      isActive: true,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCountCarts = async (userId: string) => {
  const result = await prisma.cart.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      userId,
      isActive: true,
    },
  });
  return result._sum?.quantity || 0;
};

export const upsertCart = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) => {
  const isExistCart = await prisma.cart.findFirst({
    where: {
      userId,
      productId,
      isActive: true,
    },
  });

  if (!isExistCart) {
    return await prisma.cart.create({
      data: {
        productId,
        userId,
        quantity: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        product: true,
      },
    });
  }

  return await prisma.cart.update({
    where: {
      id: isExistCart.id,
    },
    data: {
      quantity: isExistCart.quantity + 1,
      updatedAt: new Date(),
    },
    include: {
      product: true,
    },
  });
};

export const updateQtyCart = async ({
  id,
  userId,
  qty,
  isDelete,
}: {
  id: string;
  userId: string;
  qty: number;
  isDelete?: boolean;
}) => {
  const findCart = await prisma.cart.findFirst({
    where: {
      id,
      userId,
      isActive: true,
    },
    include: {
      product: true,
    },
  });

  if (!findCart) {
    throw generateInstanceError({
      message: `Cart Not Found`,
      code: ErrorCodeEnum.NOT_FOUND,
      statusCode: 404,
    });
  }

  const currQty = isDelete
    ? 0
    : Number(findCart.product?.stock) && findCart.product?.stock < qty
    ? findCart.product?.stock
    : qty;

  return await prisma.cart.update({
    where: {
      id: findCart.id,
    },
    data: {
      quantity: currQty,
      updatedAt: new Date(),
      isActive: currQty > 0 ? true : false,
    },
  });
};
