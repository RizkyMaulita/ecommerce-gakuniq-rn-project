const template = `import { PrismaClient } from "@prisma/client";\n
  const prisma = new PrismaClient();\n
  export const run = async () => {
    try {
      // write your code here
    } catch (error) {    
      console.log(error);
      throw error;
    }
  };
`;

export default template;
