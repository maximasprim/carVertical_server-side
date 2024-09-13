import db from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { TIVehicleStatus, TSVehicleStatus, vehicleStatusTable } from "../../drizzle/schema";

export const vehicleStatusService = async():Promise<TIVehicleStatus[] | null> => {
  const vehicles_status = await db.query.vehicleStatusTable.findMany();
  return vehicles_status;
}

export const getVehicleStatusService = async(id: number):Promise<TSVehicleStatus | undefined> => {
  const vehicleStatus = await db.query.vehicleStatusTable.findFirst({
    where: eq(vehicleStatusTable.vehicle_id, id)
    
  });
    return vehicleStatus;
}

export const createVehicleStatusService = async(vehicleStatus: TIVehicleStatus)=> {
    await db.insert(vehicleStatusTable).values(vehicleStatus)
    return vehicleStatus;
}

export const updateVehicleStatusService = async(id: number, vehicleStatus: TIVehicleStatus) => {
    await db.update(vehicleStatusTable).set(vehicleStatus).where(eq(vehicleStatusTable.status_id, id))
    return "vehicleStatus updated successfully";
}

export const deleteVehicleStatusService = async(id: number)=> {
    await db.delete(vehicleStatusTable).where(eq(vehicleStatusTable.status_id, id))
    return "vehicleStatus deleted successfully";
}