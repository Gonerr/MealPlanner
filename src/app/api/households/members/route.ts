import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { NextResponse } from "next/server";

export const GET = withAuthHandler(async (request, { db, user }) => {
  const householdId = Number(new URL(request.url).searchParams.get("householdId"));
  if (!Number.isSafeInteger(householdId) || householdId <= 0) {
    return NextResponse.json({ error: "Укажите пространство" }, { status: 400 });
  }
  if (!(await new HouseholdsRepository(db).isMember(householdId, Number(user.userId)))) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }
  const members = await db.all(
    `SELECT u.id, COALESCE(u.name, u.email) AS name, u.email, hm.role
     FROM household_members hm JOIN users u ON u.id = hm.user_id
     WHERE hm.household_id = ? ORDER BY hm.role DESC, u.email`, [householdId]
  );
  return NextResponse.json({ members });
});
