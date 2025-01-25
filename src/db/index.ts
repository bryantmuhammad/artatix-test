import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import databaseCredential from "../utils/database";

const poolConnection = mysql.createPool(databaseCredential);
const db = drizzle({ client: poolConnection });

export default db;
