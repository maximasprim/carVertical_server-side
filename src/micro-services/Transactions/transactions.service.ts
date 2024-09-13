import db from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { TITransactions, TSTransactions, transactionsTable } from "../../drizzle/schema";

export const transactionService = async():Promise<TITransactions[] | null> => {
  const transactions = await db.query.transactionsTable.findMany();
  return transactions;
}

export const getTransactionService = async(id: number):Promise<TSTransactions | undefined> => {
  const transaction = await db.query.transactionsTable.findFirst({
    where: eq(transactionsTable.transaction_id, id)
    
  });
    return transaction;
}

export const createTransactionService = async(transaction: TITransactions)=> {
    await db.insert(transactionsTable).values(transaction)
    return transaction;
}

export const updateTransactionService = async(id: number, transaction: TITransactions) => {
    await db.update(transactionsTable).set(transaction).where(eq(transactionsTable.transaction_id, id))
    return "transaction updated successfully";
}

export const deleteTransactionService = async(id: number)=> {
    await db.delete(transactionsTable).where(eq(transactionsTable.transaction_id, id))
    return "transaction deleted successfully";
}