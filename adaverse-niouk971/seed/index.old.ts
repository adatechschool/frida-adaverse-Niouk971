// import "dotenv/config";
// import { db } from "@/lib/db/drizzle";
// import {
//     promotionsTable,
//     projectsTable,
//     studentsProjectsTable,
// } from "@/lib/db/schema";
// import { promotions, projects, studentsProjects } from "./data";

// // ⚠️ Optionnel : reset des tables en dev pour repartir de zéro
// async function resetTables() {
//     await db.delete(studentsProjectsTable);
//     await db.delete(projectsTable);
//     await db.delete(promotionsTable);
// }

// // Insère les promotions et retourne une map name -> id
// async function seedPromotions() {
//     for (const promo of promotions) {
//         await db.insert(promotionsTable).values(promo).onConflictDoNothing();
//     }
//     const rows = await db.query.promotionsTable.findMany();
//     return new Map(rows.map((r) => [r.name, r.id]));
// }

// // Insère les projets et retourne une map type -> id
// async function seedProjects() {
//     for (const proj of projects) {
//         await db.insert(projectsTable).values(proj).onConflictDoNothing();
//     }
//     const rows = await db.query.projectsTable.findMany();
//     return new Map(rows.map((r) => [r.type, r.id]));
// }

// // Insère les projets étudiants en reliant projectType et promoName
// async function seedStudentsProjects(
//     projectTypeToId: Map<string, number>,
//     promoNameToId: Map<string, number>
// ) {
//     for (const sp of studentsProjects) {
//         const projectId = projectTypeToId.get(sp.projectType);
//         const promotionId = promoNameToId.get(sp.promoName);

//         if (!projectId || !promotionId) {
//             console.warn(`Skip: IDs not found for ${sp.title}`);
//             continue;
//         }

//         await db.insert(studentsProjectsTable).values({
//             projectId,
//             promotionId,
//             title: sp.title,
//             imageUrl: sp.imageUrl,
//             customUrl: sp.customUrl,
//             githubUrl: sp.githubUrl,
//             demoUrl: sp.demoUrl,
//             publishedAt: sp.publishedAt,
//             // createdAt est auto-généré par defaultNow()
//         }).onConflictDoNothing();
//     }
// }

// async function main() {
//     await resetTables(); // ⚠️ en dev seulement
//     const promoMap = await seedPromotions();
//     const projectMap = await seedProjects();
//     await seedStudentsProjects(projectMap, promoMap);

//     // 🔎 Vérification : afficher les projets étudiants insérés
//     const rows = await db.query.studentsProjectsTable.findMany({
//         with: {
//             project: true,
//             promotion: true,
//         },
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

//     console.log("✅ Seed completed");
// }

// main().catch((err) => {
//     console.error("❌ Seed failed", err);
//     process.exit(1);
// });
