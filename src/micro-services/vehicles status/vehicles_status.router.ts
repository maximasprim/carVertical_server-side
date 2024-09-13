import { Hono } from 'hono';
import { listVehicleStatus ,getSingleVehicleStatus,createVehicleStatus, updateVehicleStatus, deleteVehicleStatus} from './vehicles_status.controller';
import { vehiclesSchema } from '../../validators';
import {zValidator} from "@hono/zod-validator";

//creating a hono instance
export const vehiclesStatusRouter = new Hono();

//get the states
vehiclesStatusRouter.get("/vehicleStatus", listVehicleStatus);

vehiclesStatusRouter.get("/vehicleStatus/:id",getSingleVehicleStatus)

vehiclesStatusRouter.post("/vehicleStatus", zValidator('json',vehiclesSchema, (results:any, c:any) =>
    {
        if(!results.success){
            return c.json({msg: results.errors},400);
        }
    }),createVehicleStatus);
vehiclesStatusRouter.put("/vehicleStatus/:id",updateVehicleStatus)

vehiclesStatusRouter.delete("/vehicleStatus/:id",deleteVehicleStatus)