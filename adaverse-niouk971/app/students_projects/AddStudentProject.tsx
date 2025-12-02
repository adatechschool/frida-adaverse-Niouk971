// "use client";
// import { insertStudentsProjects } from "@/lib/db/actions/studentsProjects";
// import { useState } from "react";

// export const AddProject = () => {
//     // State pour chaque champ
//     const [title, setTitle] = useState("");
//     const [github, setGithub] = useState("");
//     const [demo, setDemo] = useState("");
//     const [promo, setPromo] = useState("");
//     const [project, setProject] = useState("");

//     // State pour afficher le message d'erreur
//     const [error, setError] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Vérifier si tous les champs sont remplis
//         if (!title || !github || !demo || !promo || !project) {
//             setError(true);
//             return;
//         }

//         setError(false);

//         // Exemple d'appel à ta fonction insertProject
//         await insertStudentsProjects({
//             type: project,
//             name: title,
//             description: `Projet de la promo ${promo}`,
//         });

//         // Réinitialiser les champs après envoi
//         setTitle("");
//         setGithub("");
//         setDemo("");
//         setPromo("");
//         setProject("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded">
//             {/* Texte au-dessus du titre */}
//             <h2 className="text-lg font-bold">Ajouter un nouveau projet</h2>

//             <label htmlFor="title">Titre</label>
//             <input
//                 id="title"
//                 name="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="border p-2 rounded"
//             />

//             <label htmlFor="github">URL GitHub</label>
//             <input
//                 id="github"
//                 name="github"
//                 value={github}
//                 onChange={(e) => setGithub(e.target.value)}
//                 className="border p-2 rounded"
//             />

//             <label htmlFor="demo">URL de démo</label>
//             <input
//                 id="demo"
//                 name="demo"
//                 value={demo}
//                 onChange={(e) => setDemo(e.target.value)}
//                 className="border p-2 rounded"
//             />

//             <label htmlFor="promo">Promo Ada</label>
//             <select
//                 id="promo"
//                 name="promo"
//                 value={promo}
//                 onChange={(e) => setPromo(e.target.value)}
//                 className="border p-2 rounded"
//             >
//                 <option value="">-- Choisir une promo --</option>
//                 <option value="2024">Promo 2024</option>
//                 <option value="2025">Promo 2025</option>
//                 <option value="2026">Promo 2026</option>
//             </select>

//             <label htmlFor="project">Projet Ada</label>
//             <select
//                 id="project"
//                 name="project"
//                 value={project}
//                 onChange={(e) => setProject(e.target.value)}
//                 className="border p-2 rounded"
//             >
//                 <option value="">-- Choisir un projet --</option>
//                 <option value="web">Projet Web</option>
//                 <option value="mobile">Projet Mobile</option>
//                 <option value="data">Projet Data</option>
//             </select>

//             <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//                 Envoyer
//             </button>

//             {/* Message d'erreur affiché seulement si error = true */}
//             {error && <p className="text-red-500">*Tous les champs sont obligatoires</p>}
//         </form>
//     );
// };

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
