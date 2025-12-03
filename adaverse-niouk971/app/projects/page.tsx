import { getAllStudentProjects } from "@/lib/db/actions/studentsProjects";
import { ProjectCard } from "./ProjectCard";
import { generateSlug } from "@/utils/slug";
import Navbar from "@/app/components/Navbar"; // <-- import de ta Navbar

export default async function ProjectsPage() {
  const projects = await getAllStudentProjects();
  const published = projects.filter((p) => p.publishedAt !== null);

  // Préparer les projets pour le select de la Navbar
  const navbarProjects = published.map((p) => ({
    id: p.id,
    name: p.title,
  }));

  return (
    <>
      {/* Navbar en haut */}
      <Navbar projects={navbarProjects} />

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {published.map((p) => {
          const slug = generateSlug(p.project.type, p.promotion.name);
          return <ProjectCard key={p.id} project={p} slug={slug} />;
        })}
      </div>
    </>
  );
}