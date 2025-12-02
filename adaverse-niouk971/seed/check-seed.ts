// import "dotenv/config";
// import { db } from "@/lib/db/drizzle";
// import { studentsProjectsTable } from "@/lib/db/schema";

// async function main() {
//     const rows = await db.query.studentsProjectsTable.findMany({
//         with: { project: true, promotion: true },
//     });

//     console.table(
//         rows.map((r) => ({
//             id: r.id,
//             title: r.title,
//             projectType: r.project.type,
//             promoName: r.promotion.name,
//             github: r.githubUrl,
//             demo: r.demoUrl,
//         }))
//     );
// }

// main().catch((err) => {
//     console.error("❌ Check seed failed", err);
//     process.exit(1);
// });

import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import { studentsProjectsTable, promotionsTable, projectsTable } from "@/lib/db/schema";

async function main() {
    // 1. Tous les projets étudiants avec leur projet et leur promotion
    const studentProjects = await db.query.studentsProjectsTable.findMany({
        with: {
            project: true,
            promotion: true,
        },
    });

    console.log("\n=== Tous les projets étudiants avec leur projet et leur promotion ===");
    console.table(
        studentProjects.map((sp) => ({
            id: sp.id,
            title: sp.title,
            projectType: sp.project?.type ?? "❌ no project",
            promoName: sp.promotion?.name ?? "❌ no promotion",
            github: sp.githubUrl,
            demo: sp.demoUrl,
        }))
    );

    // 2. Les promotions avec leurs projets étudiants
    const promotions = await db.query.promotionsTable.findMany({
        with: {
            studentsProjects: {
                with: { project: true },
            },
        },
    });

    console.log("\n=== Promotions avec leurs projets étudiants ===");
    console.dir(promotions, { depth: null });

    // 3. Les projets avec leurs promotions associées
    const projects = await db.query.projectsTable.findMany({
        with: {
            studentsProjects: {
                with: { promotion: true },
            },
        },
    });

    console.log("\n=== Projects avec leurs promotions associées ===");
    console.dir(projects, { depth: null });
}

main().catch((err) => {
    console.error("❌ Check seed failed", err);
    process.exit(1);
});
