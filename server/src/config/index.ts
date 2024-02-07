import dotenv from "dotenv";
dotenv.config();

const config = {
  EMAIL_PREFIX: process.env.EMAIL_PREFIX || "",
  EMAIL_DOMAIN: process.env.EMAIL_DOMAIN || "",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};

export default config;
