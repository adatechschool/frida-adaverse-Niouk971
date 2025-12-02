import { db } from "@/lib/db/drizzle";
import { studentsProjectsTable, projectsTable, promotionsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type ProjectPageProps = {
  params: { slug: string };
};

// Exemple : slug = "adaopte-frida"
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  // Découper le slug en deux parties (type projet + promo)
  const [projectType, promoName] = slug.split("-");

  // Récupérer le projet correspondant
  const project = await db.query.studentsProjectsTable.findFirst({
    with: {
      project: true,
      promotion: true,
    },
    where: (studentsProjects, { eq }) =>
      eq(projectsTable.type, projectType) && eq(promotionsTable.name, promoName),
  });

  if (!project) {
    return <div className="p-6">Projet introuvable</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>Projet : {project.project.type}</p>
      <p>Promo : {project.promotion.name}</p>
      <a href={project.githubUrl} className="text-blue-600 hover:underline">GitHub</a>
      <a href={project.demoUrl} className="ml-4 text-green-600 hover:underline">Démo</a>
    </div>
  );
}
