"use server";
import { db } from "@/lib/db/drizzle";
import { studentsProjectsTable, projectsTable, promotionsTable } from "../schema";
import { StudentProjectInsert, StudentProject } from "../types";
import { eq } from "drizzle-orm";

// CREATE → POST
export async function insertStudentProject(data: StudentProjectInsert): Promise<StudentProject> {
    const inserted = await db.insert(studentsProjectsTable).values(data).returning();
    return inserted[0];
}

// CREATE avec noms lisibles → POST
export async function insertStudentProjectByNames(
    projectType: string,
    promoName: string,
    data: Omit<StudentProjectInsert, "projectId" | "promotionId">
): Promise<StudentProject> {
    const project = await db.query.projectsTable.findFirst({
        where: eq(projectsTable.type, projectType),
    });
    if (!project) throw new Error("Projet introuvable");

    const promo = await db.query.promotionsTable.findFirst({
        where: eq(promotionsTable.name, promoName),
    });
    if (!promo) throw new Error("Promotion introuvable");

    const inserted = await db.insert(studentsProjectsTable).values({
        ...data,
        projectId: project.id,
        promotionId: promo.id,
    }).returning();

    return inserted[0];
}

// READ → GET
export async function getAllStudentProjects() {
    return db.query.studentsProjectsTable.findMany({
        with: {
            project: true,
            promotion: true,
        },
    });
}

// READ → GET
export async function getStudentProjectById(id: number) {
    return db.query.studentsProjectsTable.findFirst({
        where: eq(studentsProjectsTable.id, id),
        with: {
            project: true,
            promotion: true,
        },
    });
}

// UPDATE → PATCH
export async function updateStudentProject(id: number, data: Partial<StudentProjectInsert>) {
    const updated = await db.update(studentsProjectsTable)
        .set(data)
        .where(eq(studentsProjectsTable.id, id))
        .returning();
    return updated[0];
}

// DELETE → DELETE
export async function deleteStudentProject(id: number) {
    await db.delete(studentsProjectsTable).where(eq(studentsProjectsTable.id, id));
}
