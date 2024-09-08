import db from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { TIUsers, TSUsers, usersTable } from "../../drizzle/schema";

export const userService = async():Promise<TIUsers[] | null> => {
  const users = await db.query.usersTable.findMany();
  return users;
}

export const getUserService = async(id: number):Promise<TSUsers | undefined> => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.user_id, id)
    
  });
    return user;
}

export const createUserService = async(user: TIUsers)=> {
    await db.insert(usersTable).values(user)
    return user;
}

export const updateUserService = async(id: number, user: TIUsers) => {
    await db.update(usersTable).set(user).where(eq(usersTable.user_id, id))
    return "uses updated successfully";
}

export const deleteUserService = async(id: number)=> {
    await db.delete(usersTable).where(eq(usersTable.user_id, id))
    return "user deleted successfully";
}