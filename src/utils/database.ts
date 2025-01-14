import "dotenv/config";
import { IDatabaseCredential } from "../Interface";

const databaseCredential: IDatabaseCredential = {
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  database: process.env.DATABASE_NAME || "artatix-test",
  port: parseInt(process.env.DATABASE_PORT || "3306"),
};

if (process.env.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD !== "") {
  databaseCredential.password = process.env.DATABASE_PASSWORD;
}

export default databaseCredential;
