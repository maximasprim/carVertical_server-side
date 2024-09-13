import { Context } from "hono";
import { getTransactionService, transactionService,createTransactionService ,updateTransactionService,deleteTransactionService} from "./transactions.service";

export const listTransactions = async (c: Context) => {
    const data = await transactionService();
    if (data == null){
        return c.text ("No transactions found",404);
    }
    return c.json(data,200);
}

export const getSingleTransaction = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid transaction id",400);
    
    const transaction = await getTransactionService(id);
    if (transaction == undefined){
        return c.text("Transaction not found",404);
    }
    return c.json(transaction,200);
}


export const createtransaction = async (c: Context) => {
    try{
        const transaction = await c.req.json();
        const createdTransaction = await createTransactionService(transaction);
        if(!createdTransaction){
            return c.text("Transaction not created",404);
        }
        return c.json({msg: createdTransaction},201);
    }
    catch (error: any){
        return c.json({msg: error.message},400);
    }

}

export const updateTransaction = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid transaction id",400);

        const transaction = await c.req.json();
        try {
            //search for the transaction
            const searchedtransaction = await getTransactionService(id);
            if ( searchedtransaction == undefined)
                return c.text("Transaction not found",404);
                //get the data and update
            const res = await updateTransactionService(id,transaction);
            //return the updated transaction
            if (!res)
                return c.text("Transaction not updated",404);
                return c.json({msg: res},200);
            
        }
        catch (error: any){
            return c.json({msg: error.message},400);
        }
    
}

export const deleteTransaction = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if(isNaN(id))
        return c.text("Invalid transaction id",400);

    try{
        //search for transaction

        const transaction = await getTransactionService(id);
        if (transaction == undefined)
            return c.text("Transaction not found",404);

        //delete the transaction
        const res = await deleteTransactionService(id);
        if(!res) 
            return c.text("Transaction not deleted",404);

        return c.json({msg: res},200);
    }

    catch (error: any){
        return c.json({msg: error.message},400);
    }

}