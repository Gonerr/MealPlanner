import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { NextResponse } from "next/server";

// Кнопка "Есть дома"
export const POST = withAuthHandler(async (request, { db, user }) => {
  const { householdId: rawHouseholdId, id: rawId } = await request.json();

  const householdId = Number(rawHouseholdId);
  const id = Number(rawId);

  if (
    !Number.isSafeInteger(householdId) ||
    householdId <= 0 ||
    !Number.isSafeInteger(id) ||
    id <= 0
  ) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  const households = new HouseholdsRepository(db);

  if (!(await households.isMember(householdId, Number(user.userId)))) {
    return NextResponse.json(
      { error: "Пользователь не имеет доступа к данным" },
      { status: 403 }
    );
  }

  const item = await db.get(
    `
    SELECT *
    FROM shopping_items
    WHERE id = ?
    AND household_id = ?
    `,
    [id, householdId]
  );

  if (!item) {
    return NextResponse.json({ error: "Продукт не найден" }, { status: 404 });
  }

  await db.exec("BEGIN IMMEDIATE");

  try {
    await db.run(
      `
        INSERT INTO pantry_entries (
            household_id,
            name,
            name_key,
            quantity,
            unit,
            category
        )
        VALUES (?, ?, ?, ?, ?, ?)

        ON CONFLICT (
            household_id,
            name_key,
            unit
        )
        DO UPDATE SET 
            quantity = pantry_entries.quantity + excluded.quantity,
            updated_at = CURRENT_TIMESTAMP
        `,
      [
        householdId,
        item.name,
        item.name_key,
        item.quantity,
        item.unit,
        item.category,
      ]
    );

    await db.run(
      `
        DELETE FROM shopping_items
        WHERE id = ?
         AND household_id = ?
        `,
      [id, householdId]
    );

    await db.exec("COMMIT");
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }

  return NextResponse.json({
    success: true,
  });
});
