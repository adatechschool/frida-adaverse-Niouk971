import { NextResponse } from "next/server";
import {
    insertStudentProject,
    insertStudentProjectByNames,
    getAllStudentProjects,
} from "@/lib/db/actions/studentsProjects";

// GET → récupérer tous les projets étudiants
export async function GET() {
    try {
        const projects = await getAllStudentProjects();
        return NextResponse.json(projects);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST → créer un projet étudiant
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Si on reçoit projectType + promoName → utiliser insertStudentProjectByNames
        if (body.projectType && body.promoName) {
            const project = await insertStudentProjectByNames(
                body.projectType,
                body.promoName,
                body
            );
            return NextResponse.json(project, { status: 201 });
        }

        // Sinon → insert classique avec IDs
        const project = await insertStudentProject(body);
        return NextResponse.json(project, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
