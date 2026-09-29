import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMenuPlan = createAsyncThunk(
    'menuPlan/fetch',
    async ({ date, householdId }: { date: string; householdId: number }) => {
        return await apiClient.getMenuPlan(date, householdId);
  }
)


export const addDishToPlan = createAsyncThunk(
  "menuPlan/add",
  async ({
    date,
    householdId,
    recipeId,
    mealType,
    grams = 100,
    price = 0,
  }: {
    date: string;
    householdId: number;
    recipeId: number;
    mealType: string;
    grams?: number;
    price?: number;
  }) => {
    await apiClient.addToMenu(householdId, date, recipeId, mealType, grams, price);
    return { recipeId };
  }
);

const slice = createSlice ({
  name: 'menuPlan',
  initialState: {
    dishes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenuPlan.fulfilled, (state, action) => {
      state.dishes = action.payload;
    })
  }
})

export const selectMenuPlan = (s: any) => s.menuPlan.dishes;
export default slice.reducer;
