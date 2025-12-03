import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import { logProjectsByCategory } from "@/utils/logProjectsByCategory"; // utils à la racine

async function main() {
    // On récupère les projets étudiants avec leurs relations strictes
    const studentProjects = await db.query.studentsProjectsTable.findMany({
        with: {
            project: true,    // relation stricte : Project | null
            promotion: true,  // relation stricte : Promotion | null
        },
    });

    // Utilitaire générique : affiche toutes les catégories présentes
    logProjectsByCategory(studentProjects);
}

main().catch((err) => {
    console.error("❌ Check seed failed", err);
    process.exit(1);
});
