// Promotions
export type PromotionInsert = {
    name: string;
    startAt: Date; // colonne date("start_at")
};
export type Promotion = PromotionInsert & { id: number };

// Projects
export type ProjectInsert = {
    type: string;
    name: string;
};
export type Project = ProjectInsert & { id: number };

// Enum pour les catégories de projets étudiants
// ✅ Avantage : centralise toutes les valeurs possibles, autocomplétion et sécurité de type
export enum ProjectCategory {
    Ada = "ada",
    Personal = "personal",
    Hackathon = "hackathon", // exemple d'extension future
}

// StudentsProjects
export type StudentProjectInsert = {
    projectId: number;     // FK vers projects.id
    promotionId: number;   // FK vers promotions.id
    projectCategory: ProjectCategory; // utilisation de l'enum
    title: string;
    imageUrl: string;
    customUrl: string;
    githubUrl: string;
    demoUrl: string;

    // createdAt et publishedAt sont gérés par la base → pas besoin de les fournir
};
export type StudentProject = StudentProjectInsert & {
    id: number;
    createdAt: Date;
    publishedAt?: Date | null;

    // Relations strictes : soit null, soit un objet complet
    project: Project | null;
    promotion: Promotion | null;
};
