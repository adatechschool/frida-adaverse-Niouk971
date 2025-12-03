"use client";
import Link from "next/link";
import { StudentProject } from "@/lib/db/types";

type ProjectCardProps = {
  project: StudentProject & {
    project: { id: number; type: string; name: string };
    promotion: { id: number; name: string; startAt: Date };
  };
  slug: string;
};

const DEFAULT_THUMBNAIL = "/default-thumbnail.jpg";

export const ProjectCard = ({ project, slug }: ProjectCardProps) => {
  const githubThumbnail =
    project.githubUrl && project.githubUrl.includes("github.com")
      ? `${project.githubUrl}/blob/main/thumbnail.png?raw=true`
      : null;

  const imageSrc = githubThumbnail || project.imageUrl || DEFAULT_THUMBNAIL;

  return (
    <Link href={`/projects/${slug}`} className="block">
      <div className="border rounded p-4 shadow-md flex flex-col gap-2">
        <h3 className="text-xl font-bold">{project.title}</h3>

        <p className="text-gray-700">
          <span className="font-semibold">Projet :</span> {project.project.type} (
          {project.project.name})
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Promotion :</span> {project.promotion.name}
        </p>

        {/* Liens externes */}
        <div className="flex gap-3 mt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()} // ✅ évite conflit avec Link parent
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Démo
            </a>
          )}
          {project.customUrl && (
            <a
              href={project.customUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Custom
            </a>
          )}
        </div>

        <img
          src={imageSrc}
          alt={`Image du projet ${project.title}`}
          className="rounded mt-3 w-full h-48 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_THUMBNAIL;
          }}
        />

        <p className="text-sm text-gray-500 mt-2">
          Créé le : {new Date(project.createdAt).toLocaleDateString("fr-FR")}
        </p>
        {project.publishedAt && (
          <p className="text-sm text-gray-500">
            Publié le : {new Date(project.publishedAt).toLocaleDateString("fr-FR")}
          </p>
        )}
      </div>
    </Link>
  );
};