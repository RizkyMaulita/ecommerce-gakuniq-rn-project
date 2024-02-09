import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const __dirname = path.dirname(new URL(import.meta.url).pathname); // current directory

const getFileNames = (path: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

(async () => {
  try {
    const files = await getFileNames(__dirname);
    const seedFiles = files.filter((file) => file.includes(`.seed.ts`));

    if (!seedFiles.length) {
      console.log(`There is nothing to seed`);
      return;
    }

    const currSeedMigrate = await prisma.migrationSeed.findMany();

    for await (const file of seedFiles) {
      const isExistSeed = currSeedMigrate.find(
        (seed) => seed.filename === file
      );

      if (isExistSeed) break;

      const filePath = path.join(__dirname + `/${file}`);

      try {
        const seedFile = await import(filePath);

        if (typeof seedFile.run !== "function") {
          throw `File ${file} doesn't have async function with name 'run'`;
        }

        await seedFile.run();

        await prisma.migrationSeed.create({
          data: { timestamp: new Date(), filename: file },
        });
        console.log(`Successfully seed data at ${file}`);
      } catch (error) {
        console.error(`An error occured while seed data at ${file}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
