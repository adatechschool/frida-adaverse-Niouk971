import { NextResponse } from "next/server";
import {
    getStudentProjectById,
    updateStudentProject,
    deleteStudentProject,
} from "@/lib/db/actions/studentsProjects";

// GET → récupérer un projet par son id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const project = await getStudentProjectById(Number(params.id));
        if (!project) {
            return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// PATCH → mettre à jour un projet par son id
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const updated = await updateStudentProject(Number(params.id), body);
        return NextResponse.json(updated);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// DELETE → supprimer un projet par son id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await deleteStudentProject(Number(params.id));
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
