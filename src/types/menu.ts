export interface Ingredient {
    id: number;
    name: string;
    description: string;
    isAvailable: boolean;
    category: "vegetable" | "meat" | "dairy" | "spice" | "other";
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: DishCategory;
    ingredients: number[];
    preparationTime: number; //мин
    isAvailable: boolean;
    imageUrl?: string;
    calories?: number;
    isChefSpecial: boolean;
    availableDays?: number[];
    mealType: "breakfast" | "lunch" | "dinner" | "snacks";
}

export type DishCategory =
    | "salads"
    | "soups"
    | "main"
    | "desserts"
    | "snacks"
    | "drinks"
    | "specials";
export interface SelectedItem {
    dish: Dish;
    mealType: string | null;
    grams: number;
}

export interface MenuState {
    isAdminMode: any;
    dishes: Dish[];
    ingredients: Ingredient[];
    selectedCategory: DishCategory | "all";
    //   isAdminMode: boolean;
    searchQuery: string;
    loading: boolean;
    error: string | null;
    selected: SelectedItem[];
}

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface MenuItem {
    id: number;
    recipeId: number;
    name: string;
    calories: number;
    grams: number;
    preparationTime: number;
    mealType: MealType;
}
