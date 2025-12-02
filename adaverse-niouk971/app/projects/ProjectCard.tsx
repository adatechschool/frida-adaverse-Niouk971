"use client";
import { StudentProject } from "@/lib/db/types";

type ProjectCardProps = {
  project: StudentProject & {
    project: { id: number; type: string; name: string };
    promotion: { id: number; name: string; startAt: Date };
  };
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="border rounded p-4 shadow-md flex flex-col gap-2">
      {/* Titre du projet */}
      <h3 className="text-xl font-bold">{project.title}</h3>

      {/* Infos jointes */}
      <p className="text-gray-700">
        <span className="font-semibold">Projet :</span> {project.project.type} ({project.project.name})
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Promotion :</span> {project.promotion.name}
      </p>

      {/* Liens */}
      <div className="flex gap-3 mt-2">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Démo
        </a>
        <a
          href={project.customUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          Custom
        </a>
      </div>

      {/* Image */}
      <img
        src={project.imageUrl}
        alt={`Image du projet ${project.title}`}
        className="rounded mt-3 w-full h-48 object-cover"
      />

      {/* Dates */}
      <p className="text-sm text-gray-500 mt-2">
        Créé le : {new Date(project.createdAt).toLocaleDateString("fr-FR")}
      </p>
      {project.publishedAt && (
        <p className="text-sm text-gray-500">
          Publié le : {new Date(project.publishedAt).toLocaleDateString("fr-FR")}
        </p>
      )}
    </div>
  );
};
