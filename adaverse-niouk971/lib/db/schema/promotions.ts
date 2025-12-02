import { pgTable, serial, varchar, date, uniqueIndex } from "drizzle-orm/pg-core";

export const promotionsTable = pgTable("promotions", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    startAt: date("start_at").notNull(),
}, (table) => [
    uniqueIndex("promotions_name_unique").on(table.name),
]);
