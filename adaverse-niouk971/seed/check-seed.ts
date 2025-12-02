import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import { studentsProjectsTable } from "@/lib/db/schema";

async function main() {
    const rows = await db.query.studentsProjectsTable.findMany({
        with: { project: true, promotion: true },
    });

    console.table(
        rows.map((r) => ({
            id: r.id,
            title: r.title,
            projectType: r.project.type,
            promoName: r.promotion.name,
            github: r.githubUrl,
            demo: r.demoUrl,
        }))
    );
}

main().catch((err) => {
    console.error("❌ Check seed failed", err);
    process.exit(1);
});
