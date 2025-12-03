"use server";
import { db } from "@/lib/db/drizzle";
import { promotionsTable } from "../schema";
import { PromotionInsert, Promotion } from "../types";
import { eq } from "drizzle-orm";

// CREATE → POST
export async function createPromotion(data: PromotionInsert): Promise<Promotion> {
    const inserted = await db.insert(promotionsTable).values(data).returning();
    return inserted[0];
}

// READ → GET
export async function getPromotions() {
    return db.query.promotionsTable.findMany();
}

// READ → GET
export async function getPromotionById(id: number) {
    return db.query.promotionsTable.findFirst({
        where: eq(promotionsTable.id, id),
    });
}

// UPDATE → PATCH
export async function updatePromotion(id: number, data: Partial<PromotionInsert>) {
    const updated = await db.update(promotionsTable)
        .set(data)
        .where(eq(promotionsTable.id, id))
        .returning();
    return updated[0];
}

// DELETE → DELETE
export async function deletePromotion(id: number) {
    await db.delete(promotionsTable).where(eq(promotionsTable.id, id));
}
