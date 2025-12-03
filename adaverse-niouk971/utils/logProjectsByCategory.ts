import { ProjectCategory, Project, Promotion } from "@/lib/db/types";

// Utilitaire générique pour afficher les projets étudiants par catégorie
// ✅ Compatible avec les jointures strictes (project: Project | null, promotion: Promotion | null)
// ✅ Utilise l'enum ProjectCategory pour plus de clarté
export function logProjectsByCategory(rows: {
    id: number;
    title: string;
    projectCategory: ProjectCategory;
    githubUrl: string;
    demoUrl: string;
    project: Project | null;     // relation stricte
    promotion: Promotion | null; // relation stricte
}[]) {
    // Récupérer toutes les catégories distinctes et les trier alphabétiquement
    const categories = Array.from(new Set(rows.map(sp => sp.projectCategory))).sort();

    for (const category of categories) {
        const projectsInCategory = rows.filter(sp => sp.projectCategory === category);

        console.log(`\n=== Projets étudiants (${category}) ===`);
        console.table(
            projectsInCategory.map(sp => ({
                id: sp.id,
                title: sp.title,
                // ternaire explicite : soit l'objet existe, soit fallback
                projectType: sp.project ? sp.project.type : "❌ no project",
                promoName: sp.promotion ? sp.promotion.name : "❌ no promotion",
                github: sp.githubUrl,
                demo: sp.demoUrl,
            }))
        );
    }
}
