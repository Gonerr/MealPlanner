import { formatDateForAPI } from "@/features/helpers";
import { withAuthHandler } from "@/lib/api-helper";
import { MenuPlanCRUD } from "@/lib/db/meal-plan.repository";
import { NextResponse } from "next/server";

// Получение меню на всю неделю
export const GET = withAuthHandler(async (req, { user, db }) => {
  const { searchParams } = new URL(req.url);

  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "start and end are required" },
      { status: 400 }
    );
  }

  const menu = new MenuPlanCRUD(db);

  const startDate = formatDateForAPI(start);
  const endDate = formatDateForAPI(end);

  console.log({
    start: start,
    end: end,
    startDate: startDate,
    endDate: endDate,
  });

  const rows = await menu.getWeekPlan(user.userId, startDate, endDate);

  return NextResponse.json(rows);
});
