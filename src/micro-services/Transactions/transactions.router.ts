import { Hono } from 'hono';
import { listTransactions ,getSingleTransaction,createtransaction, updateTransaction, deleteTransaction} from './transactions.controller';
import { transactionSchema } from '../../validators';
import {zValidator} from "@hono/zod-validator";

//creating a hono instance
export const transactionsRouter = new Hono();

//get the states
transactionsRouter.get("/transactions", listTransactions);

transactionsRouter.get("/transactions/:id",getSingleTransaction)

transactionsRouter.post("/transactions", zValidator('json',transactionSchema, (results:any, c:any) =>
    {
        if(!results.success){
            return c.json({msg: results.errors},400);
        }
    }),createtransaction);
transactionsRouter.put("/transactions/:id",updateTransaction)

transactionsRouter.delete("/transactions/:id",deleteTransaction)