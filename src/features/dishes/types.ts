import { DishCategory } from "@/types/menu";

export type AddModalProps = {
  show: boolean;
  onHide: () => void;
};

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  ingredients: number[];
  preparationTime: number; //мин
  isAvailable: boolean;
  isArchived?: boolean;
  imageUrl?: string;
  calories?: number;
  isChefSpecial: boolean;
  availableDays?: number[];
  mealType: "breakfast" | "lunch" | "dinner" | "snacks";
}
