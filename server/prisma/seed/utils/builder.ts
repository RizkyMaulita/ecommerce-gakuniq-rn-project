import minimist from "minimist";
import * as fs from "fs/promises";
import * as path from "path";
import template from "./template";

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
    const filename = `${new Date().getTime()}_${prefixName}.seed.ts`;

    const targetFilePath = path.join(__dirname + `./../${filename}`);

    await fs.writeFile(targetFilePath, template);

    console.log(`File seed successfully created at ${targetFilePath}`);
  } catch (error) {
    console.error(error);
  }
})();
