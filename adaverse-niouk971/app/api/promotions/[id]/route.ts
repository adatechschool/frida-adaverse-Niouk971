import { NextResponse } from "next/server";
import {
    getPromotionById,
    updatePromotion,
    deletePromotion,
} from "@/lib/db/actions/promotions";

// GET → récupérer une promotion par son id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const promo = await getPromotionById(Number(params.id));
        if (!promo) {
            return NextResponse.json({ error: "Promotion introuvable" }, { status: 404 });
        }
        return NextResponse.json(promo);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// PATCH → mettre à jour une promotion par son id
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const updated = await updatePromotion(Number(params.id), body);
        return NextResponse.json(updated);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// DELETE → supprimer une promotion par son id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await deletePromotion(Number(params.id));
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
