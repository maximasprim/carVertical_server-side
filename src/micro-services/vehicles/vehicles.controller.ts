import { Context } from "hono";
import { getVehicleService, vehicleService,createVehicleService ,updateVehicleService,deleteVehicleService} from "./vehicles.service";

export const listVehicles = async (c: Context) => {
    const data = await vehicleService();
    if (data == null){
        return c.text ("No vehicles found",404);
    }
    return c.json(data,200);
}

export const getSingleVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid vehicle id",400);
    
    const vehicle = await getVehicleService(id);
    if (vehicle == undefined){
        return c.text("Vehicle not found",404);
    }
    return c.json(vehicle,200);
}


export const createvehicle = async (c: Context) => {
    try{
        const vehicle = await c.req.json();
        const createdVehicle = await createVehicleService(vehicle);
        if(!createdVehicle){
            return c.text("Vehicle not created",404);
        }
        return c.json({msg: createdVehicle},201);
    }
    catch (error: any){
        return c.json({msg: error.message},400);
    }

}

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid vehicle id",400);

        const vehicle = await c.req.json();
        try {
            //search for the vehicle
            const searchedvehicle = await getVehicleService(id);
            if ( searchedvehicle == undefined)
                return c.text("Vehicle not found",404);
                //get the data and update
            const res = await updateVehicleService(id,vehicle);
            //return the updated vehicle
            if (!res)
                return c.text("Vehicle not updated",404);
                return c.json({msg: res},200);
            
        }
        catch (error: any){
            return c.json({msg: error.message},400);
        }
    
}

export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if(isNaN(id))
        return c.text("Invalid vehicle id",400);

    try{
        //search for vehicle

        const vehicle = await getVehicleService(id);
        if (vehicle == undefined)
            return c.text("Vehicle not found",404);

        //delete the vehicle
        const res = await deleteVehicleService(id);
        if(!res) 
            return c.text("Vehicle not deleted",404);

        return c.json({msg: res},200);
    }

    catch (error: any){
        return c.json({msg: error.message},400);
    }

}