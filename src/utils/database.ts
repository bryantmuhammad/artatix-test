import "dotenv/config";
import { IDatabaseCredential } from "../Interface";

const databaseCredential: IDatabaseCredential = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  database: process.env.DB_NAME!,
  port: parseInt(process.env.DB_PORT!),
};

if (process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQL_ROOT_PASSWORD !== "") {
  databaseCredential.password = process.env.MYSQL_ROOT_PASSWORD;
}

export default databaseCredential;
