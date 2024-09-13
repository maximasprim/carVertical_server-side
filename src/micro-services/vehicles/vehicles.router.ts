import { Hono } from 'hono';
import { listVehicles ,getSingleVehicle,createvehicle, updateVehicle, deleteVehicle} from './vehicles.controller';
import { vehiclesSchema } from '../../validators';
import {zValidator} from "@hono/zod-validator";

//creating a hono instance
export const vehiclesRouter = new Hono();

//get the states
vehiclesRouter.get("/vehicles", listVehicles);

vehiclesRouter.get("/vehicles/:id",getSingleVehicle)

vehiclesRouter.post("/vehicles", zValidator('json',vehiclesSchema, (results:any, c:any) =>
    {
        if(!results.success){
            return c.json({msg: results.errors},400);
        }
    }),createvehicle);
vehiclesRouter.put("/vehicles/:id",updateVehicle)

vehiclesRouter.delete("/vehicles/:id",deleteVehicle)