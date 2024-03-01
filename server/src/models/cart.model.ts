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
