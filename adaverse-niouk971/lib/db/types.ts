// export type StudentsProjectsInsert = {
//     type: string;
//     name: string;
//     description?: string;
// };

// export type StudentsProjects = StudentsProjectsInsert & {
//     id: number;
//     createdAt: Date;
//     publishedAt?: Date | null;
// };


// Promotions

export type PromotionInsert = {
    name: string;
    startAt: Date; // colonne date("start_at")
};

export type Promotion = PromotionInsert & {
    id: number;
};


// Projects

export type ProjectInsert = {
    type: string;
    name: string;
};

export type Project = ProjectInsert & {
    id: number;
};


// StudentsProjects

export type StudentProjectInsert = {
    projectId: number;     // FK vers projects.id
    promotionId: number;   // FK vers promotions.id
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
};
