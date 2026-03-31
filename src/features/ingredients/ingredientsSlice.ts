import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../app/types/menu";
import { apiClient } from "@/lib/api-client";
import { stat } from "fs";


// Асинхронные действия для ингредиентов
export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await apiClient.getIngredients();
    }
)

export const createIngredient = createAsyncThunk(
    'ingredients/createIngredient',
    async (ingredient: Omit<Ingredient, 'id'>) => {
        return await apiClient.createIngredient(ingredient);
    }
)

export const updateIngredient = createAsyncThunk(
    'ingredients/updateIngredient',
    async ({id, ingredient }: {id: number; ingredient: Partial<Ingredient>}) => {
        const success = await apiClient.updateIngredient(id, ingredient);
        if (success) {
            return{id, ingredient};
        }
        
        throw  new Error('Failed to update ingredient');
    }
)

export const deleteIngredient = createAsyncThunk(
    'ingredients/deleteIngredient',
    async (id: number) => {
        const success = await apiClient.deleteIngredient(id);
        if (success) {
            return id;
        }
        
        throw  new Error('Failed to delete ingredient');
    }
)

interface IngredientState {
    items: Ingredient[];
    loading: boolean;
    error: string | null;
}

const initialState: IngredientState = {
    items: [],
    loading: false,
    error: null
};

const ingredientsSlice = createSlice({
    name: 'Ingredients',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message || 'Failed to fetch ingredients';
            })

        builder
            .addCase(createIngredient.fulfilled, (state, action) => {
                if (action.payload){
                    state.items.push(action.payload)
                }
            })

        builder
            .addCase(updateIngredient.fulfilled, (state, action) => {
                const {id, ingredient} = action.payload;
                const index = state.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...ingredient };
                }
            })

        builder 
            .addCase(deleteIngredient.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
    }
});

export const { clearError } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const selectAllIngredients = (state: { ingredients: IngredientState}) => state.ingredients.items;
export const selectIngredientsLoading = (state: { ingredients: IngredientState }) => state.ingredients.loading;
export const selectIngredientsError = (state: { ingredients: IngredientState }) => state.ingredients.error;
export const selectIngredientById = (id: number) => (state: { ingredients: Ingredient[] }) => state.ingredients.find(ing => ing.id === id);