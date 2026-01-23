import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Dish, DishCategory, MenuState } from '../../types/menu';

const initialState: MenuState = {
  dishes: [
    {
      id: 1,
      name: 'Курица по-французски',
      description: 'Запеканка из нескольких слоев',
      price: 450,
      category: 'main',
      ingredients: [1, 2, 3, 4],
      preparationTime: 55,
      isAvailable: true,
      calories: 320,
      isChefSpecial: true,
    },
    {
      id: 2,
      name: 'Стейк из говядины',
      description: 'Сочный стейк с овощами гриль',
      price: 890,
      category: 'main',
      ingredients: [6, 1, 4],
      preparationTime: 25,
      isAvailable: true,
      calories: 650,
      isChefSpecial: false,
    },
    {
      id: 3,
      name: 'Шоколадный фондан',
      description: 'Теплый шоколадный десерт с мороженым',
      price: 350,
      category: 'desserts',
      ingredients: [7, 5],
      preparationTime: 20,
      isAvailable: false,
      calories: 420,
      isChefSpecial: true,
    },
    {
      id: 4,
      name: 'Мохито',
      description: 'Освежающий коктейль с мятой и лаймом',
      price: 300,
      category: 'drinks',
      ingredients: [],
      preparationTime: 5,
      isAvailable: true,
      calories: 150,
      isChefSpecial: false,
    },
  ],
  ingredients: [],
  selectedCategory: 'all',
  isAdminMode: false,
  searchQuery: '',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addDish: {
      reducer: (state, action: PayloadAction<Dish>) => {
        state.dishes.push(action.payload);
      },
      prepare: (dish: Omit<Dish, 'id'>) => ({
        payload: { ...dish, id: 0 },
      }),
    },
    
    updateDish: (state, action: PayloadAction<Dish>) => {
      const index = state.dishes.findIndex(dish => dish.id === action.payload.id);
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    
    deleteDish: (state, action: PayloadAction<number>) => {
      state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
    },
    
    toggleDishAvailability: (state, action: PayloadAction<number>) => {
      const dish = state.dishes.find(dish => dish.id === action.payload);
      if (dish) {
        dish.isAvailable = !dish.isAvailable;
      }
    },
    
    setSelectedCategory: (state, action: PayloadAction<DishCategory | 'all'>) => {
      state.selectedCategory = action.payload;
    },
    
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addDish,
  updateDish,
  deleteDish,
  toggleDishAvailability,
  setSelectedCategory,
  toggleAdminMode,
  setSearchQuery,
} = menuSlice.actions;

// Селекторы
export const selectAllDishes = (state: { menu: MenuState }) => state.menu.dishes;
export const selectSelectedCategory = (state: { menu: MenuState }) => state.menu.selectedCategory;
export const selectIsAdminMode = (state: { menu: MenuState }) => state.menu.isAdminMode;
export const selectSearchQuery = (state: { menu: MenuState }) => state.menu.searchQuery;

export const selectFilteredDishes = (state: { menu: MenuState }) => {
  const { dishes, selectedCategory, searchQuery } = state.menu;
  
  let filtered = dishes.filter(dish => dish.isAvailable);
  
  // Фильтрация по категории
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(dish => dish.category === selectedCategory);
  }
  
  // Поиск
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(dish =>
      dish.name.toLowerCase().includes(query) ||
      dish.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
};

export const selectMenuStats = (state: { menu: MenuState }) => {
  const dishes = state.menu.dishes;
  const total = dishes.length;
  const available = dishes.filter(d => d.isAvailable).length;
  const specials = dishes.filter(d => d.isChefSpecial).length;
  
  const categories: Record<DishCategory, number> = {
    salads: 0,
    main: 0,
    desserts: 0,
    drinks: 0,
    specials: 0,
    soups: 0,
    snacks: 0
  };
  
  dishes.forEach(dish => {
    categories[dish.category]++;
  });
  
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const avgPrice = total > 0 ? totalPrice / total : 0;
  
  return { total, available, specials, categories, avgPrice };
};

export default menuSlice.reducer;