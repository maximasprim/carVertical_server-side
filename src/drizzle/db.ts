// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
// import * as schema from "./schema";


// config({ path: ".env" });

// export const client = neon(process.env.DATABASE_URL!);
// export const db = drizzle(client, {schema, logger:true});
 

// export default db;

import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";

export const client = new Client({
    connectionString: process.env.Database_URL as string,
})

const main = async () =>{
    await client.connect();
}
main();
const db = drizzle(client, {schema, logger: true})

export default db;