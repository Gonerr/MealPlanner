import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { MealPlanRepository } from "@/lib/db/meal-plan.repository";
import { NextResponse } from "next/server";

// Получение меню на всю неделю
export const GET = withAuthHandler(async (req, { user, db }) => {
  const { searchParams } = new URL(req.url);

  const householdId = Number(searchParams.get("householdId"));
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (
    !Number.isSafeInteger(householdId) ||
    householdId <= 0 ||
    !start ||
    !end
  ) {
    return NextResponse.json(
      { error: "household, start and end are required" },
      { status: 400 }
    );
  }

  const householdsRepository = new HouseholdsRepository(db);

  const isMember = await householdsRepository.isMember(
    householdId,
    Number(user.userId)
  );
  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const startDate = formatDateForAPI(start);
  const endDate = formatDateForAPI(end);

  const repository = new MealPlanRepository(db);

  const rows = await repository.getMenuByDateRange(
    householdId,
    startDate,
    endDate
  );

  return NextResponse.json(rows);
});
