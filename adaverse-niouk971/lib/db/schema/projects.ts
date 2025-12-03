import { pgTable, serial, varchar, uniqueIndex } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
}, (table) => [
    // ⚡️ Unicité sur la combinaison type + name
    uniqueIndex("projects_type_name_unique").on(table.type, table.name),
]);
