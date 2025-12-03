"use client";
import { useState } from "react";
import { insertStudentProjectByNames } from "@/lib/db/actions/studentsProjects";

export const AddProject = () => {
    // State pour chaque champ
    const [title, setTitle] = useState("");
    const [github, setGithub] = useState("");
    const [demo, setDemo] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [promoName, setPromoName] = useState("");
    const [projectType, setProjectType] = useState("");

    // State pour afficher le message d'erreur
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérifier si tous les champs sont remplis
        if (!title || !github || !demo || !imageUrl || !customUrl || !promoName || !projectType) {
            setError(true);
            return;
        }

        setError(false);

        // Appel à la fonction serveur qui traduit projectType et promoName en IDs
        await insertStudentProjectByNames(projectType, promoName, {
            title,
            githubUrl: github,
            demoUrl: demo,
            imageUrl,
            customUrl,
        });

        // Réinitialiser les champs après envoi
        setTitle("");
        setGithub("");
        setDemo("");
        setImageUrl("");
        setCustomUrl("");
        setPromoName("");
        setProjectType("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded">
            <h2 className="text-lg font-bold">Ajouter un nouveau projet</h2>

            <label htmlFor="title">Titre</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" />

            <label htmlFor="github">URL GitHub</label>
            <input id="github" value={github} onChange={(e) => setGithub(e.target.value)} className="border p-2 rounded" />

            <label htmlFor="demo">URL de démo</label>
            <input id="demo" value={demo} onChange={(e) => setDemo(e.target.value)} className="border p-2 rounded" />

            <label htmlFor="imageUrl">Image URL</label>
            <input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-2 rounded" />

            <label htmlFor="customUrl">Custom URL</label>
            <input id="customUrl" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} className="border p-2 rounded" />

            <label htmlFor="promo">Promotion</label>
            <select id="promo" value={promoName} onChange={(e) => setPromoName(e.target.value)} className="border p-2 rounded">
                <option value="">-- Choisir une promo --</option>
                <option value="Frida">Frida</option>
                <option value="Niouke971">Niouke971</option>
            </select>

            <label htmlFor="project">Projet</label>
            <select id="project" value={projectType} onChange={(e) => setProjectType(e.target.value)} className="border p-2 rounded">
                <option value="">-- Choisir un projet --</option>
                <option value="Adaopte">Adaopte</option>
                <option value="Portfolio">Portfolio</option>
            </select>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Envoyer</button>

            {error && <p className="text-red-500">*Tous les champs sont obligatoires</p>}
        </form>
    );
};
