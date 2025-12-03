"use server";
import { db } from "@/lib/db/drizzle";
import { projectsTable } from "../schema";
import { ProjectInsert, Project } from "../types";
import { eq } from "drizzle-orm";

// CREATE → POST
export async function createProject(data: ProjectInsert): Promise<Project> {
    const inserted = await db.insert(projectsTable).values(data).returning();
    return inserted[0];
}

// READ → GET
export async function getProjects() {
    return db.query.projectsTable.findMany();
}

// READ → GET
export async function getProjectById(id: number) {
    return db.query.projectsTable.findFirst({
        where: eq(projectsTable.id, id),
    });
}

// UPDATE → PATCH
export async function updateProject(id: number, data: Partial<ProjectInsert>) {
    const updated = await db.update(projectsTable)
        .set(data)
        .where(eq(projectsTable.id, id))
        .returning();
    return updated[0];
}

// DELETE → DELETE
export async function deleteProject(id: number) {
    await db.delete(projectsTable).where(eq(projectsTable.id, id));
}
