import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";

export const themesTable = pgTable("themes", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
});

const skillStatus = pgEnum("skill_status", ["undeterminated", "not_acquired", "in_progress", "acquired"]);

export const skillsTable = pgTable("skills", {
    id: serial("id").primaryKey(),
    description: text("description").notNull().unique(),
    level: integer("level").notNull(),
    themeId: integer("theme_id").references(() => themesTable.id, {onDelete: "set null"}),
    status: skillStatus("status"),
});
