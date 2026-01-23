import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../types/menu";

const initialState: Ingredient[] = [
    {
        id: 1,
        name: 'Помидор',
        description: 'Свежие томаты, не сливовидные',
        isAvailable: true,
        category: 'vegetable'
    },
    {
        id: 2,
        name: 'Куриная грудка',
        description: 'Филе курицы',
        isAvailable: true,
        category: 'meat'
    },
    {
        id: 3,
        name: 'Сыр Пармезан',
        description: 'Твердый сыр',
        isAvailable: true,
        category: 'dairy'
    },
    {
        id: 4,
        name: 'Базилик',
        description: 'Свежая зелень',
        isAvailable: true,
        category: 'spice'
    },
    {
        id: 5,
        name: 'Молоко',
        description: 'Цельное молоко',
        isAvailable: false,
        category: 'dairy'
    },
    {
        id: 6,
        name: 'Говядина',
        description: 'Вырезка говяжья',
        isAvailable: false,
        category: 'meat'
    },
    {
        id: 7,
        name: 'Шоколад',
        description: 'Темный шоколад',
        isAvailable: false,
        category: 'other'
    },
]

const ingredientsSlice = createSlice({
    name: 'Ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.push(action.payload);
        },
        updateIngredient: (state, action: PayloadAction<Ingredient>) => {
            const index = state.findIndex(ing => ing.id === action.payload.id);
            if (index !== -1){
                state[index] = action.payload;
            }
        },
        deleteIngredient: (state, action: PayloadAction<number>) => {
            return state.filter(ing => ing.id !== action.payload)
        },
    },
});

export const {addIngredient, updateIngredient, deleteIngredient} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const selectAllIngredients = (state: { ingredients: Ingredient[]}) => state.ingredients;
export const selectIngredientById = (id: number) => 
      (state: { ingredients: Ingredient[] }) => 
    state.ingredients.find(ing => ing.id === id);