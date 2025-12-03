"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar"; // <-- import de ta Navbar

export default function NewStudentProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectCategory, setProjectCategory] = useState("ada"); // "ada" ou "personal"
  const [promoName, setPromoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/student-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          projectCategory,
          promoName,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Projet soumis avec succès !");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setProjectCategory("ada");
        setPromoName("");
      } else {
        setMessage("❌ Erreur : " + data.error);
      }
    } catch (err: any) {
      setMessage("❌ Erreur inattendue : " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // ⚡️ Ici tu peux passer une liste vide ou des projets si tu veux alimenter le select
  const navbarProjects: { id: string; name: string }[] = [];

  return (
    <>
      {/* Navbar en haut */}
      <Navbar projects={navbarProjects} />

      <main className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Soumettre un projet étudiant</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titre du projet"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            placeholder="Description du projet"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full h-24"
            required
          />

          <input
            type="text"
            placeholder="URL de l'image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="ada">Projet Ada (lié à une promo)</option>
            <option value="personal">Projet personnel (hors Ada)</option>
          </select>

          <input
            type="text"
            placeholder="Nom de la promotion (ex: Ada 2025)"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
            className="border p-2 rounded w-full"
            required={projectCategory === "ada"}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Soumettre"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium">{message}</p>
        )}
      </main>
    </>
  );
}