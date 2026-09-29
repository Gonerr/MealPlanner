import { createHash } from "node:crypto";
import { withAuthHandler } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export const POST = withAuthHandler(async (request, { db, user }) => {
  const { code: rawCode } = await request.json();
  const code = typeof rawCode === "string" ? rawCode.trim().toLowerCase() : "";
  if (!/^[a-f0-9]{24}$/.test(code)) {
    return NextResponse.json({ error: "Проверь код приглашения" }, { status: 400 });
  }
  const hash = createHash("sha256").update(code).digest("hex");
  const userId = Number(user.userId);
  const invite = await db.get(
    `SELECT c.id, c.household_id AS householdId FROM household_join_codes c
     JOIN households h ON h.id = c.household_id
     WHERE c.code_hash = ? AND c.used_at IS NULL AND c.expires_at > datetime('now') AND h.type = 'family'`,
    [hash]
  );
  if (!invite) return NextResponse.json({ error: "Код истёк или уже использован" }, { status: 400 });
  const existing = await db.get(`SELECT 1 FROM household_members WHERE household_id = ? AND user_id = ?`, [invite.householdId, userId]);
  if (existing) return NextResponse.json({ error: "Ты уже состоишь в этой семье" }, { status: 409 });

  // Получить код и добавить участника нужно одним действием: два человека не смогут принять его одновременно.
  await db.exec("BEGIN IMMEDIATE");
  try {
    const used = await db.run(
      `UPDATE household_join_codes SET used_at = datetime('now'), used_by = ?
       WHERE id = ? AND used_at IS NULL AND expires_at > datetime('now')`, [userId, invite.id]
    );
    if (used.changes !== 1) {
      await db.exec("ROLLBACK");
      return NextResponse.json({ error: "Код уже использован" }, { status: 409 });
    }
    await db.run(
      `INSERT INTO household_members (household_id, user_id, role) VALUES (?, ?, 'member')`,
      [invite.householdId, userId]
    );
    await db.exec("COMMIT");
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
  return NextResponse.json({ householdId: invite.householdId });
});
