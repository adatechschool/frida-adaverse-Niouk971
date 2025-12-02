import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./lib/db/schema", // schéma centralisé
    out: "./lib/db/migrations", // dossier migrations drizzle
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
});
