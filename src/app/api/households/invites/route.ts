import { createHash, randomBytes } from "node:crypto";
import { withAuthHandler } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export const POST = withAuthHandler(async (request, { db, user }) => {
  const { householdId: rawId } = await request.json();
  const householdId = Number(rawId);
  if (!Number.isSafeInteger(householdId) || householdId <= 0) {
    return NextResponse.json({ error: "Некорректное пространство" }, { status: 400 });
  }
  const owner = await db.get(
    `SELECT 1 FROM household_members hm JOIN households h ON h.id = hm.household_id
     WHERE hm.household_id = ? AND hm.user_id = ? AND hm.role = 'owner' AND h.type = 'family'`,
    [householdId, Number(user.userId)]
  );
  if (!owner) return NextResponse.json({ error: "Только владелец семьи может приглашать" }, { status: 403 });

  const code = randomBytes(12).toString("hex");
  const hash = createHash("sha256").update(code).digest("hex");
  const result = await db.run(
    `INSERT INTO household_join_codes (household_id, code_hash, created_by, expires_at)
     VALUES (?, ?, ?, datetime('now', '+7 days'))`, [householdId, hash, Number(user.userId)]
  );
  const invite = await db.get(`SELECT expires_at AS expiresAt FROM household_join_codes WHERE id = ?`, [result.lastID]);
  return NextResponse.json({ code, expiresAt: invite.expiresAt }, { status: 201 });
});
