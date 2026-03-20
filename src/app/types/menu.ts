export interface Ingredient {
    id: number;
    name: string;
    description: string;
    isAvailable: boolean;
    category: 'vegetable' | 'meat' | 'dairy' | 'spice' | 'other';
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
}

export type DishCategory = |
    'salads' |
    'soups' |
    'main' |
    'desserts' |
    'snacks' |
    'drinks' |
    'specials'
;

export interface MenuState {
    dishes: Dish[];
  ingredients: Ingredient[];
  selectedCategory: DishCategory | 'all';
  isAdminMode: boolean;
  searchQuery: string;
}