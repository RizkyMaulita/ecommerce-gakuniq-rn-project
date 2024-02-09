import { PrismaClient, UserRoleEnum } from "@prisma/client";

const prisma = new PrismaClient();

export const run = async () => {
  try {
    const findRoles = await prisma.userRole.findMany({
      where: {
        code: {
          in: Object.keys(UserRoleEnum) as UserRoleEnum[],
        },
      },
    });

    if (findRoles.length) {
      throw new Error("roles has been exists");
    }

    const roles = await prisma.userRole.createMany({
      data: Object.keys(UserRoleEnum).map((role) => ({
        name: role,
        code: role as UserRoleEnum,
      })),
    });

    console.log(`Successfully seeding data roles with count : ${roles.count}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
