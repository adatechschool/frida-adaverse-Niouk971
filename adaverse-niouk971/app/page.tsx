import { getAllStudentProjects } from "@/lib/db/actions/studentsProjects";

export default async function HomePage() {
    const projects = await getAllStudentProjects();
    const published = projects.filter(p => p.publishedAt !== null);

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            {published.map((proj) => (
                <div key={proj.id} className="border rounded-lg shadow p-4">
                    <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-40 object-cover rounded"
                    />
                    <h2 className="text-xl font-bold mt-2">{proj.title}</h2>
                    <p className="text-sm text-gray-500">
                        {proj.promotion.name} • {proj.publishedAt?.toLocaleDateString()}
                    </p>
                </div>
            ))}
        </main>
    );
}
