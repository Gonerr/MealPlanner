import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Dish, DishCategory, MenuState } from '../../app/types/menu';
import { apiClient } from '@/lib/api-client';

export const fetchRecipes = createAsyncThunk(
  'menu/fetchRecipes',
  async () => {
    return await apiClient.getRecipes();
  }
);

export const createRecipe = createAsyncThunk(
  'menu/createRecipe',
  async (recipe: Omit<Dish, 'id'>) => {
      return await apiClient.createRecipe(recipe);
  }
);

export const updateRecipe = createAsyncThunk(
    'menu/updateRecipe',
    async ({ id, recipe }: { id: number; recipe: Partial<Dish> }) => {
        const success = await apiClient.updateRecipe(id, recipe);
        if (success) {
            return { id, recipe };
        }
        throw new Error('Failed to update recipe');
    }
);

export const deleteRecipe = createAsyncThunk(
    'menu/deleteRecipe',
    async (id: number) => {
        const success = await apiClient.deleteRecipe(id);
        if (success) {
            return id;
        }
        throw new Error('Failed to delete recipe');
    }
);

const initialState: MenuState = {
    dishes: [],
    ingredients: [],
    selectedCategory: 'all',
    isAdminMode: false,
    searchQuery: '',
    loading: false,
    error: null
};


const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<DishCategory | 'all'>) => {
            state.selectedCategory = action.payload;
        },
        
        toggleAdminMode: (state) => {
            state.isAdminMode = !state.isAdminMode;
        },
        
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        
        clearError: (state) => {
            state.error = null;
        }
  },
  extraReducers: (builder) => {
        // Fetch recipes
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.dishes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch recipes';
            });
        
        // Create recipe
        builder
            .addCase(createRecipe.fulfilled, (state, action) => {
                if (action.payload) {
                    state.dishes.push(action.payload);
                }
            });
        
        // Update recipe
        builder
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const { id, recipe } = action.payload;
                const index = state.dishes.findIndex(dish => dish.id === id);
                if (index !== -1) {
                    state.dishes[index] = { ...state.dishes[index], ...recipe };
                }
            });
        
        // Delete recipe
        builder
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
            });
    }
});

export const {
    setSelectedCategory,
    toggleAdminMode,
    setSearchQuery,
    clearError
} = menuSlice.actions;

// Селекторы
export const selectAllDishes = (state: { menu: MenuState }) => state.menu.dishes;
export const selectSelectedCategory = (state: { menu: MenuState }) => state.menu.selectedCategory;
export const selectIsAdminMode = (state: { menu: MenuState }) => state.menu.isAdminMode;
export const selectSearchQuery = (state: { menu: MenuState }) => state.menu.searchQuery;
export const selectLoading = (state: { menu: MenuState }) => state.menu.loading;
export const selectError = (state: { menu: MenuState }) => state.menu.error;

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