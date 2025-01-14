import { eq } from "drizzle-orm";
import db from "../../db";
import { usersTable } from "../../db/schema";

const getUser = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return user;
};

export { getUser };
