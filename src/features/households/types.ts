export type HouseholdType = "personal" | "family";

export type HouseholdRole = "owner" | "member";

export interface Household {
  id: number;
  name: string;

  type: HouseholdType;

  role: HouseholdRole;

  memberCount: number;

  createdAt: string;
}
