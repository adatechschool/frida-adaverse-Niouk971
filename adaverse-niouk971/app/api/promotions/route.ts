import { NextResponse } from "next/server";
import {
    createPromotion,
    getPromotions,
} from "@/lib/db/actions/promotions";

// GET → récupérer toutes les promotions
export async function GET() {
    try {
        const promos = await getPromotions();
        return NextResponse.json(promos);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST → créer une promotion
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const promo = await createPromotion(body);
        return NextResponse.json(promo, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
