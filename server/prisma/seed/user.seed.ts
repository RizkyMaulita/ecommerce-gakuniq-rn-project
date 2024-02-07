import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "@/utils/bcrypt";
import { generateAddressEmail } from "@/utils/email";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    const roles = await prisma.userRole.findMany({
      where: {
        code: {
          in: ["SUPERADMIN", "ADMIN"],
        },
      },
    });

    if (!roles.length) {
      throw "roles not found";
    }

    const data = roles.map(
      (role) =>
        ({
          email: generateAddressEmail(role.code.toLowerCase()),
          username: role.name,
          password: hashPassword("password"),
          roleId: role.id,
        } as Prisma.UserCreateManyInput)
    );

    const users = await prisma.user.createMany({ data });

    console.log(`Successfully seeding data users with count : ${users.count}`);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
})();
