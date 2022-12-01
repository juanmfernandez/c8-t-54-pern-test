import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const db = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: "postgres",
    dialectOptions: { decimalNumbers: true },
    logging: true,
  }
);

export { db };
