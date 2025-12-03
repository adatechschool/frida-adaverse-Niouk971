"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Project {
    id: string;
    name: string;
}

interface NavbarProps {
    projects: Project[];
}

export default function Navbar({ projects }: NavbarProps) {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState("");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const projectId = e.target.value;
        setSelectedProject(projectId);
        if (projectId) {
            router.push(`/projects/${projectId}`); // adapte selon ta route
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
            {/* Logo */}
            <div className="text-2xl font-bold">adaVERSE</div>

            {/* Select + Bouton */}
            <div className="flex items-center gap-4">
                <select
                    value={selectedProject}
                    onChange={handleSelectChange}
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Tous les projets</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <Link
                    href="/students-projects/new"
                    className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    Soumettre un projet
                </Link>
            </div>
        </nav>
    );
}