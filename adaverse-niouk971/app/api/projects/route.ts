import { NextResponse } from "next/server";
import {
    createProject,
    getProjects,
} from "@/lib/db/actions/projects";

// GET → récupérer tous les projets
export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST → créer un projet
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const project = await createProject(body);
        return NextResponse.json(project, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
