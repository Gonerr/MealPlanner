import { canAccess, validId } from "@/features/helpers";
import { withAuthHandler } from "@/lib/api-helper";
import { NextResponse } from "next/server";

export const GET = withAuthHandler(async (request, { db, user }) => {
  const householdId = Number(
    new URL(request.url).searchParams.get("householdId")
  );

  if (!validId(householdId)) {
    return NextResponse.json(
      {
        error: "Укажите пространство",
      },
      { status: 400 }
    );
  }

  if (!(await canAccess(db, householdId, Number(user.userId)))) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const items = await db.all(
    `
            SELECT 
                id,
                ingredient_id as ingredientId,
                name,
                quantity,
                unit, 
                category,
                price,
                status,
                source
            FROM shopping_items
            WHERE household_id = ? 
            ORDER BY category, name
            `,
    [householdId]
  );

  return NextResponse.json({ items });
});

export const POST = withAuthHandler(async (request, { db, user }) => {
  const body = await request.json();

  const householdId = Number(body.householdId);
  const name = typeof body.name === "string" ? body.name.trip() : "";

  const quantity = Number(body.quantity ?? 1);
  const unit = body.unit || "шт";
  const category = body.category || "other";
  const price = Number(body.price ?? 0);

  if (
    !validId(householdId) ||
    !name ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  if (!(await canAccess(db, householdId, Number(user.userId)))) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  const nameKey = name.normalize("NFC").toLocaleLowerCase("ru");

  await db.run(
    `
    INSERT INTO shopping_items (
        household_id,
        name,
        name_key,
        quantity,
        unit,
        category,
        price,
        status,
        source
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 'need', 'manual')
    `,
    [householdId, name, nameKey, quantity, unit, category, price]
  );
  return NextResponse.json({ success: true }, { status: 200 });
});

export const PATCH = withAuthHandler(async (request, { db, user }) => {
  const { householdId, id, status } = await request.json();

  if (
    !validId(householdId) ||
    !validId(id) ||
    !["need", "bought"].includes(status)
  ) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  if (!(await canAccess(db, householdId, Number(user.userId)))) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  await db.run(
    `
    UPDATE shopping_items
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND household_id = ?
  `,
    [status, id, householdId]
  );

  return NextResponse.json({ success: true });
});

export const DELETE = withAuthHandler(async (request, { db, user }) => {
  const { householdId, id } = await request.json();

  if (!validId(householdId) || !validId(id)) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  if (!(await canAccess(db, householdId, Number(user.userId)))) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }

  await db.run(
    `
      DELETE FROM shopping_items
      WHERE id = ? AND household_id = ?
    `,
    [id, householdId]
  );

  return NextResponse.json({ success: true });
});
