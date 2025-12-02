import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; // importe toutes tes tables
import { neon } from "@neondatabase/serverless";

// Initialise la connexion Neon (client HTTP)
const sql = neon(process.env.DATABASE_URL!);

// Initialise Drizzle avec la connexion et le schéma
export const db = drizzle(sql, { schema });

// Typage explicite pour l’autocomplétion
export type DbType = typeof db;
