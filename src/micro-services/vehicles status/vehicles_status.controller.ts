import { Context } from "hono";
import { getVehicleStatusService, vehicleStatusService,createVehicleStatusService ,updateVehicleStatusService,deleteVehicleStatusService} from "./vehicles_status.service";

export const listVehicleStatus = async (c: Context) => {
    const data = await vehicleStatusService();
    if (data == null){
        return c.text ("No vehicleStatus found",404);
    }
    return c.json(data,200);
}

export const getSingleVehicleStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid vehicleStatus id",400);
    
    const vehicleStatus = await getVehicleStatusService(id);
    if (vehicleStatus == undefined){
        return c.text("vehicleStatus not found",404);
    }
    return c.json(vehicleStatus,200);
}


export const createVehicleStatus = async (c: Context) => {
    try{
        const vehicleStatus = await c.req.json();
        const createdVehicleStatus = await createVehicleStatusService(vehicleStatus);
        if(!createdVehicleStatus){
            return c.text("vehicleStatus not created",404);
        }
        return c.json({msg: createdVehicleStatus},201);
    }
    catch (error: any){
        return c.json({msg: error.message},400);
    }

}

export const updateVehicleStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid vehicleStatus id",400);

        const vehicleStatus = await c.req.json();
        try {
            //search for the vehicleStatus
            const searchedvehicle = await getVehicleStatusService(id);
            if ( searchedvehicle == undefined)
                return c.text("vehicleStatus not found",404);
            
                //get the data and update
            const res = await updateVehicleStatusService(id,vehicleStatus);
            //return the updated vehicleStatus
            if (!res)
                return c.text("vehicleStatus not updated",404);
                return c.json({msg: res},200);
            
        }
        catch (error: any){
            return c.json({msg: error.message},400);
        }
    
}

export const deleteVehicleStatus = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if(isNaN(id))
        return c.text("Invalid vehicleStatus id",400);

    try{
        //search for vehicleStatus

        const vehicleStatus = await getVehicleStatusService(id);
        if (vehicleStatus == undefined)
            
            return c.text("vehicleStatus not found",404);

        //delete the vehicleStatus
        const res = await deleteVehicleStatusService(id);
        if(!res) 
            return c.text("vehicleStatus not deleted",404);

        return c.json({msg: res},200);
    }

    catch (error: any){
        return c.json({msg: error.message},400);
    }

}