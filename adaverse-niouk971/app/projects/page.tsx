import Link from "next/link";
import { getAllStudentProjects } from "@/lib/db/actions/studentsProjects";
import { ProjectCard } from "./ProjectCard";
import { generateSlug } from "@/utils/slug";

export default async function ProjectsPage() {
  // Récupère tous les projets étudiants avec leurs jointures
  const projects = await getAllStudentProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {projects.map((p) => {
        // Génère un slug unique à partir du type de projet et du nom de la promo
        const slug = generateSlug(p.project.type, p.promotion.name);

        return (
          <Link key={p.id} href={`/projects/${slug}`}>
            <ProjectCard project={p} />
          </Link>
        );
      })}
    </div>
  );
}
