import { Context } from "hono";
import { getUserService, userService,createUserService ,updateUserService,deleteUserService} from "./users.service";

export const listUsers = async (c: Context) => {
    const data = await userService();
    if (data == null){
        return c.text ("No users found",404);
    }
    return c.json(data,200);
}

export const getSingleUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid user id",400);
    
    const user = await getUserService(id);
    if (user == undefined){
        return c.text("User not found",404);
    }
    return c.json(user,200);
}


export const createuser = async (c: Context) => {
    try{
        const user = await c.req.json();
        const createdUser = await createUserService(user);
        if(!createdUser){
            return c.text("User not created",404);
        }
        return c.json({msg: createdUser},201);
    }
    catch (error: any){
        return c.json({msg: error.message},400);
    }

}

export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)){
        return c.text("Invalid user id",400);

        const user = await c.req.json();
        try {
            //search for the user
            const searcheduser = await getUserService(id);
            if ( searcheduser == undefined){
                return c.text("User not found",404);
                //get the data and update
            const res = await updateUserService(id,user);
            //return the updated user
            if (!res)
                return c.text("User not updated",404);
                return c.json({msg: res},200);
            }
        }
        catch (error: any){
            return c.json({msg: error.message},400);
        }
    }
}

export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if(isNaN(id))
        return c.text("Invalid user id",400);

    try{
        //search for user

        const user = await getUserService(id);
        if (user == undefined)
            return c.text("User not found",404);

        //delete the user
        const res = await deleteUserService(id);
        if(!res) 
            return c.text("User not deleted",404);

        return c.json({msg: res},200);
    }

    catch (error: any){
        return c.json({msg: error.message},400);
    }

}