import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Household } from "./types";

interface HouseholdsState {
  items: Household[];
  selectedHouseholdId: number | null;

  isLoading: boolean;
  error: string | null;
}

const initialState: HouseholdsState = {
  items: [],
  selectedHouseholdId: null,
  isLoading: false,
  error: null,
};

export const fetchHouseholds = createAsyncThunk<Household[]>(
  "households/fetchHouseholds",
  async () => {
    const response = await fetch("/api/households");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Не удалось загрузить пространства");
    }

    return data.households as Household[];
  }
);

export const createHousehold = createAsyncThunk<Household, string>(
  "households/createHousehold",
  async (name) => {
    const response = await fetch("/api/households", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Не удалось создать семью");
    }

    return data.household;
  }
);

const householdsSlice = createSlice({
  name: "households",
  initialState,

  reducers: {
    clearHouseholds(state) {
      state.items = [];
      state.selectedHouseholdId = null;
      state.error = null;
    },
    setSelectedHousehold(state, action: PayloadAction<number>) {
      const exists = state.items.some(
        (household) => household.id === action.payload
      );

      if (exists) {
        state.selectedHouseholdId = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHouseholds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchHouseholds.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = action.payload;

        const selectedStillExists = action.payload.some(
          (household) => household.id === state.selectedHouseholdId
        );

        if (!selectedStillExists) {
          const personal = action.payload.find(
            (household) => household.type === "personal"
          );

          state.selectedHouseholdId =
            personal?.id ?? action.payload[0]?.id ?? null;
        }
      })

      .addCase(fetchHouseholds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Ошибка загрузки";
      })

      .addCase(createHousehold.fulfilled, (state, action) => {
        state.items.push(action.payload);

        state.selectedHouseholdId = action.payload.id;
      });
  },
});

export const { setSelectedHousehold, clearHouseholds } =
  householdsSlice.actions;

export default householdsSlice.reducer;
