import { HouseholdsRepository } from "./db/households.repository";

export async function canAccess(db: any, householdId: number, userId: number) {
  return new HouseholdsRepository(db).isMember(householdId, userId);
}
