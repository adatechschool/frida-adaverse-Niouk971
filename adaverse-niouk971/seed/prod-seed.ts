import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import {
    promotionsTable,
    projectsTable,
    studentsProjectsTable,
} from "@/lib/db/schema";
import { promotions, projects, studentsProjects } from "./data";

async function main() {
    // ⚠️ Pas de resetTables ici !

    // Insérer promos et projets
    for (const promo of promotions) {
        await db.insert(promotionsTable).values(promo).onConflictDoNothing();
    }
    for (const proj of projects) {
        await db.insert(projectsTable).values(proj).onConflictDoNothing();
    }

    // Récupérer les IDs
    const promoRows = await db.query.promotionsTable.findMany();
    const projectRows = await db.query.projectsTable.findMany();
    const promoMap = new Map(promoRows.map((r) => [r.name, r.id]));
    const projectMap = new Map(projectRows.map((r) => [r.type, r.id]));

    // Insérer les studentsProjects
    for (const sp of studentsProjects) {
        const projectId = projectMap.get(sp.projectType);
        const promotionId = promoMap.get(sp.promoName);

        if (!projectId || !promotionId) {
            console.warn(`Skip: IDs not found for ${sp.title}`);
            continue;
        }

        await db.insert(studentsProjectsTable).values({
            projectId,
            promotionId,
            projectCategory: sp.projectCategory, // ⚡️ obligatoire
            title: sp.title,
            imageUrl: sp.imageUrl,
            customUrl: sp.customUrl,
            githubUrl: sp.githubUrl,
            demoUrl: sp.demoUrl,
            publishedAt: sp.publishedAt,
        }).onConflictDoNothing();
    }

    console.log("✅ Prod seed completed");
}

main().catch((err) => {
    console.error("❌ Prod seed failed", err);
    process.exit(1);
});
