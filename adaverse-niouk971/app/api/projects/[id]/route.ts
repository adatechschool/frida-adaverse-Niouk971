import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/db/actions/projects";

// GET → récupérer un projet par son id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    const project = await getProjectById(projectId);
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
    const projectId = Number(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    const body = await req.json();
    const updated = await updateProject(projectId, body);
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
    const projectId = Number(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    await deleteProject(projectId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
