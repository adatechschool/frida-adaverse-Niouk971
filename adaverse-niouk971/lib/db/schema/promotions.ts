import { pgTable, serial, varchar, date, uniqueIndex } from "drizzle-orm/pg-core";

export const promotionsTable = pgTable("promotions", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    // ⚡️ Ici on précise mode: "date" pour que Drizzle mappe en Date JS
    startAt: date("start_at", { mode: "date" }).notNull(),
}, (table) => [
    uniqueIndex("promotions_name_unique").on(table.name),
]);
