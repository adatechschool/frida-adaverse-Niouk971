import { pgTable, serial, integer, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";
import { promotionsTable } from "./promotions";

export const studentsProjectsTable = pgTable("students_projects", {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
        .references(() => projectsTable.id, { onDelete: "cascade" })
        .notNull(),
    promotionId: integer("promotion_id")
        .references(() => promotionsTable.id, { onDelete: "cascade" })
        .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    customUrl: varchar("custom_url", { length: 255 }).notNull(),
    githubUrl: varchar("github_url", { length: 255 }).notNull(),
    demoUrl: varchar("demo_url", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
}, (table) => [
    uniqueIndex("students_projects_unique_project_promo")
        .on(table.projectId, table.promotionId),
]);
