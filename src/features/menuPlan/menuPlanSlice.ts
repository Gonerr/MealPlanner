import { apiClient } from "@/lib/api-client";
import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenuPlan = createAsyncThunk(
    'menuPlan/fetch',
    async (date: string) => {
        return await apiClient.getMenuPlan(date);
  }
)


export const addDishToPlan = createAsyncThunk(
  'menuPlan/add',
    async({date, recipeId}: any) => {
    await apiClient.addToMenu(date, recipeId);
    return {recipeId};
  }
)

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