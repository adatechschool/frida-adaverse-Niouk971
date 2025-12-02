import { relations } from "drizzle-orm";

// Tables
export { promotionsTable } from "./promotions";
export { projectsTable } from "./projects";
export { studentsProjectsTable } from "./studentsProjects";

// Imports locaux pour définir les relations
import { promotionsTable } from "./promotions";
import { projectsTable } from "./projects";
import { studentsProjectsTable } from "./studentsProjects";

// Relations côté students_projects
export const studentsProjectsRelations = relations(studentsProjectsTable, ({ one }) => ({
    project: one(projectsTable, {
        fields: [studentsProjectsTable.projectId],
        references: [projectsTable.id],
    }),
    promotion: one(promotionsTable, {
        fields: [studentsProjectsTable.promotionId],
        references: [promotionsTable.id],
    }),
}));

// Relations côté projects
export const projectsRelations = relations(projectsTable, ({ many }) => ({
    studentsProjects: many(studentsProjectsTable),
}));

// Relations côté promotions
export const promotionsRelations = relations(promotionsTable, ({ many }) => ({
    studentsProjects: many(studentsProjectsTable),
}));
