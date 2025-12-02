// "use server";
// import { db } from "@/lib/db/drizzle";
// import { projectsTable } from "../schema";
// import { StudentProjectInsert } from "../types";
// import { eq } from "drizzle-orm";

// export async function insertProject(data: StudentProjectInsert) {
//     const inserted = await db.insert(projectsTable).values(data).returning(); // returning() → récupère la ligne insérée
//     return inserted[0]; // retourne le premier élément du tableau (le projet inséré avec son id)
// }

// export async function deleteProject(id: number) {
//     await db.delete(projectsTable).where(eq(projectsTable.id, id));
// }
