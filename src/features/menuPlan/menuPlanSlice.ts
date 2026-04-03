import { apiClient } from "@/lib/api-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenuPlan = createAsyncThunk(
    'menuPlan/fetch',
    async (date: string) => {
        return await apiClient.getMenuPlan(date);
  }
)