import { getAllStudentProjects } from "@/lib/db/actions/studentsProjects";
import { ProjectCard } from "@/app/projects/ProjectCard"; // <-- ton composant
import { generateSlug } from "@/utils/slug";
import Navbar from "@/app/components/Navbar"; // <-- import de ta Navbar

export default async function StudentProjectsPage() {
  const projects = await getAllStudentProjects();

  // Séparer les projets en deux catégories
  const adaProjects = projects.filter((p) => p.projectCategory === "ada");
  const personalProjects = projects.filter((p) => p.projectCategory === "personal");

  // Préparer les projets pour le select de la Navbar
  const navbarProjects = projects.map((p) => ({
    id: p.id,
    name: p.title,
  }));

  return (
    <>
      {/* Navbar en haut */}
      <Navbar projects={navbarProjects} />

      <main className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Projets étudiants</h1>

        {/* Section Projets Ada */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projets réalisés à Ada</h2>
          {adaProjects.length === 0 ? (
            <p className="text-gray-500">Aucun projet Ada pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adaProjects.map((proj) => {
                const slug = generateSlug(proj.project.type, proj.promotion.name);
                return <ProjectCard key={proj.id} project={proj} slug={slug} />;
              })}
            </div>
          )}
        </section>

        {/* Section Projets personnels */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Projets personnels</h2>
          {personalProjects.length === 0 ? (
            <p className="text-gray-500">Aucun projet personnel pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalProjects.map((proj) => {
                const slug = generateSlug(proj.project.type, proj.promotion.name);
                return <ProjectCard key={proj.id} project={proj} slug={slug} />;
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}