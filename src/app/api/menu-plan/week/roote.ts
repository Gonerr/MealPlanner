import { withAuthHandler } from "@/lib/api-helper";
import { MenuPlanCRUD } from "@/lib/db/menuPlan-crud";
import { NextResponse } from "next/server";

// Получение меню на всю неделю
export const GET = withAuthHandler(async (req, { user, db}) => {
    const {searchParams} = new URL(req.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
        return NextResponse.json(
            {error: "start and end are required"},
            {status: 400}
        )
    }

    const menu = new MenuPlanCRUD(db);
    const rows = await menu.getWeekPlan(user.id, start, end);

    return NextResponse.json(rows);
});