import { hashPassword } from "@/utils/bcrypt";
import { generateAddressEmail } from "@/utils/email";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const run = async () => {
  try {
    const roles = await prisma.userRole.findMany({
      where: {
        code: {
          in: ["SUPERADMIN", "ADMIN"],
        },
      },
    });

    if (!roles.length) {
      throw new Error("roles not found");
    }

    const data = roles.map(
      (role) =>
        ({
          email: generateAddressEmail(role.code.toLowerCase()),
          username: role.name,
          password: hashPassword("password"),
          statusVerify: "VERIFIED",
          roleId: role.id,
        } as Prisma.UserCreateManyInput)
    );

    const users = await prisma.user.createMany({ data });

    console.log(`Successfully seeding data users with count : ${users.count}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
