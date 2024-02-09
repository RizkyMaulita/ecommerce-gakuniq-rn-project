import minimist from "minimist";
import * as fs from "fs/promises";
import * as path from "path";

type ArgCommandType = {
  name: string;
};
const argv: ArgCommandType = minimist(process.argv.slice(2));

const __dirname = path.dirname(new URL(import.meta.url).pathname); // current directory

(async () => {
  try {
    const prefixName = argv.name;

    if (typeof prefixName !== "string" || !prefixName) {
      throw "name is required";
    }

    const targetFilePath = path.join(
      __dirname + `./../${new Date().getTime()}_${prefixName}.seed.ts`
    );

    await fs.writeFile(
      targetFilePath,
      `import { PrismaClient } from "@prisma/client";\n\nconst prisma = new PrismaClient();\n\nexport const run = async () => {};`
    );

    console.log(`File seed successfully created at ${targetFilePath}`);
  } catch (error) {
    console.error(error);
  }
})();
