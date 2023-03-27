import { config } from "dotenv";

config();

const configMod = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  secretKey: process.env.SECRET_KEY,
  iv: process.env.IV,
};

export { configMod };
