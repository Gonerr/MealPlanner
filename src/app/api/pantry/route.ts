import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { NextResponse } from "next/server";

const validId = (value: unknown) => Number.isSafeInteger(Number(value)) && Number(value) > 0;
const denied = () => NextResponse.json({ error: "Нет доступа к пространству" }, { status: 403 });

async function canAccess(db: any, householdId: number, userId: number) {
  return new HouseholdsRepository(db).isMember(householdId, userId);
}

export const GET = withAuthHandler(async (request, { db, user }) => {
  const householdId = Number(new URL(request.url).searchParams.get("householdId"));
  if (!validId(householdId)) return NextResponse.json({ error: "Укажите пространство" }, { status: 400 });
  if (!(await canAccess(db, householdId, Number(user.userId)))) return denied();

  const items = await db.all(
    `SELECT id, name, quantity, unit, category, updated_at AS updatedAt
     FROM pantry_entries WHERE household_id = ? ORDER BY category, name`,
    [householdId]
  );
  return NextResponse.json({ items });
});

export const POST = withAuthHandler(async (request, { db, user }) => {
  const body = await request.json();
  const householdId = Number(body.householdId);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const nameKey = name.normalize("NFC").toLocaleLowerCase("ru");
  const quantity = Number(body.quantity);
  const unit = body.unit;
  const category = typeof body.category === "string" ? body.category.trim() : "other";
  if (!validId(householdId) || !name || name.length > 80 || !Number.isFinite(quantity) || quantity <= 0 || quantity > 100000 || !["шт", "г", "кг", "мл", "л"].includes(unit) || category.length > 40) {
    return NextResponse.json({ error: "Проверьте название, количество и единицу измерения" }, { status: 400 });
  }
  if (!(await canAccess(db, householdId, Number(user.userId)))) return denied();

  await db.run(
    `INSERT INTO pantry_entries (household_id, name, name_key, quantity, unit, category)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(household_id, name_key, unit) DO UPDATE SET
       quantity = pantry_entries.quantity + excluded.quantity,
       updated_at = CURRENT_TIMESTAMP`,
    [householdId, name, nameKey, quantity, unit, category || "other"]
  );
  return NextResponse.json({ success: true }, { status: 201 });
});

export const PATCH = withAuthHandler(async (request, { db, user }) => {
  const { householdId: rawHouseholdId, id: rawId, quantity: rawQuantity } = await request.json();
  const householdId = Number(rawHouseholdId);
  const id = Number(rawId);
  const quantity = Number(rawQuantity);
  if (!validId(householdId) || !validId(id) || !Number.isFinite(quantity) || quantity <= 0 || quantity > 100000) {
    return NextResponse.json({ error: "Некорректное количество" }, { status: 400 });
  }
  if (!(await canAccess(db, householdId, Number(user.userId)))) return denied();
  const result = await db.run(
    `UPDATE pantry_entries SET quantity = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND household_id = ?`, [quantity, id, householdId]
  );
  return result.changes ? NextResponse.json({ success: true }) : NextResponse.json({ error: "Продукт не найден" }, { status: 404 });
});

export const DELETE = withAuthHandler(async (request, { db, user }) => {
  const { householdId: rawHouseholdId, id: rawId } = await request.json();
  const householdId = Number(rawHouseholdId);
  const id = Number(rawId);
  if (!validId(householdId) || !validId(id)) return NextResponse.json({ error: "Некорректный идентификатор" }, { status: 400 });
  if (!(await canAccess(db, householdId, Number(user.userId)))) return denied();
  const result = await db.run(`DELETE FROM pantry_entries WHERE id = ? AND household_id = ?`, [id, householdId]);
  return result.changes ? NextResponse.json({ success: true }) : NextResponse.json({ error: "Продукт не найден" }, { status: 404 });
});
