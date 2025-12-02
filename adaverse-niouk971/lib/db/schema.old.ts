// import { pgTable, serial, varchar, integer, timestamp, date, uniqueIndex } from "drizzle-orm/pg-core";

// export const promotionsTable = pgTable("promotions", {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 255 }).notNull(),
//     startAt: date("start_at").notNull(),
// }, (table) => [
//     uniqueIndex("promotions_name_unique").on(table.name),
// ]);

// export const projectsTable = pgTable("projects", {
//     id: serial("id").primaryKey(),
//     type: varchar("type", { length: 255 }).notNull(),
//     name: varchar("name", { length: 255 }).notNull(),
// }, (table) => [
//     uniqueIndex("projects_type_unique").on(table.type),
// ]);

// export const studentsProjectsTable = pgTable("students_projects", {
//     id: serial("id").primaryKey(),
//     projectId: integer("project_id")
//         .references(() => projectsTable.id, { onDelete: "cascade" })
//         .notNull(),
//     promotionId: integer("promotion_id")
//         .references(() => promotionsTable.id, { onDelete: "cascade" })
//         .notNull(),
//     title: varchar("title", { length: 255 }).notNull(),
//     imageUrl: varchar("image_url", { length: 255 }).notNull(),
//     customUrl: varchar("custom_url", { length: 255 }).notNull(),
//     githubUrl: varchar("github_url", { length: 255 }).notNull(),
//     demoUrl: varchar("demo_url", { length: 255 }).notNull(),
//     createdAt: timestamp("created_at", { withTimezone: true })
//         .defaultNow()
//         .notNull(),
//     publishedAt: timestamp("published_at", { withTimezone: true }),
// }, (table) => [
//     uniqueIndex("students_projects_unique_project_promo")
//         .on(table.projectId, table.promotionId),
// ]);
