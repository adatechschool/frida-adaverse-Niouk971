// "use server";
// import { db } from "@/lib/db/drizzle";
// import { studentsProjectsTable } from "../schema";
// import { StudentsProjectsInsert } from "../types";
// import { eq } from "drizzle-orm";

// export async function insertStudentsProjects(data: StudentsProjectsInsert) {
//     const inserted = await db.insert(studentsProjectsTable).values(data).returning(); // returning() → récupère la ligne insérée
//     return inserted[0]; // retourne le premier élément du tableau (le projet inséré avec son id)
// }

// export async function deleteProject(id: number) {
//     await db.delete(studentsProjectsTable).where(eq(studentsProjectsTable.id, id));
// }

"use server";
import { db } from "@/lib/db/drizzle";
import { studentsProjectsTable, projectsTable, promotionsTable } from "../schema/index";
import { StudentProjectInsert, StudentProject } from "../types";
import { eq } from "drizzle-orm";

// Insérer un StudentProject en traduisant projectType et promoName en IDs
export async function insertStudentProjectByNames(
    projectType: string,
    promoName: string,
    data: Omit<StudentProjectInsert, "projectId" | "promotionId">
): Promise<StudentProject> {
    // Trouver le projet par son type
    const project = await db.query.projectsTable.findFirst({
        where: eq(projectsTable.type, projectType),
    });
    if (!project) throw new Error("Projet introuvable");

    // Trouver la promo par son nom
    const promo = await db.query.promotionsTable.findFirst({
        where: eq(promotionsTable.name, promoName),
    });
    if (!promo) throw new Error("Promotion introuvable");

    // Construire l'objet complet avec les IDs
    const inserted = await db.insert(studentsProjectsTable)
        .values({
            ...data,
            projectId: project.id,
            promotionId: promo.id,
        })
        .returning();

    return inserted[0];
}

// Récupérer tous les projets étudiants avec jointures
export async function getAllStudentProjects() {
    const projects = await db.query.studentsProjectsTable.findMany({
        with: {
            project: true,    // jointure automatique vers projectsTable
            promotion: true,  // jointure automatique vers promotionsTable
        },
    });

    return projects;
}


