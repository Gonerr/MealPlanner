import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { NextResponse } from "next/server";

const mapHousehold = (household: any) => ({
  id: household.id,
  name: household.name,
  type: household.type,
  role: household.role,
  memberCount: Number(household.member_count ?? 1),
  createdAt: household.created_at,
});

// GET /api/households - получить все семейства пользователя
export const GET = withAuthHandler(async (request, { db, user }) => {
  const userId = Number(user.userId);
  const repository = new HouseholdsRepository(db);

  // Для старых пользователей автоматически создаст
  // личное пространство
  await repository.ensurePersonalHousehold(userId);

  const households = await repository.getAllForUser(userId);

  let householdsResults = households.map(mapHousehold);

  console.log(householdsResults);

  return NextResponse.json({ households: householdsResults });
});

// POST /api/households - создать новое household
export const POST = withAuthHandler(async (request, { db, user }) => {
  const userId = Number(user.userId);

  const body = await request.json();

  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json(
      {
        error: "Название семьи обязательно",
      },
      {
        status: 400,
      }
    );
  }

  if (name.length > 60) {
    return NextResponse.json(
      {
        error: "Название семьи слишком длинное",
      },
      {
        status: 400,
      }
    );
  }
  const repository = new HouseholdsRepository(db);

  const household = await repository.createFamily(userId, name);

  return NextResponse.json(
    {
      household: mapHousehold(household),
    },
    {
      status: 201,
    }
  );
}, true);
