import { Hono } from 'hono';
import { listUsers ,getSingleUser,createuser, updateUser, deleteUser} from './users.controller';
import { userSchema } from '../../validators';
import {zValidator} from "@hono/zod-validator";

//creating a hono instance
export const usersRouter = new Hono();

//get the states
usersRouter.get("/users", listUsers);

usersRouter.get("/users/:id",getSingleUser)

usersRouter.post("/users", zValidator('json',userSchema, (results:any, c:any) =>
    {
        if(!results.success){
            return c.json({msg: results.errors},400);
        }
    }),createuser);
usersRouter.put("/users/:id",updateUser)

usersRouter.delete("/users/:id",deleteUser)