import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  filterValue: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<number>) => {
      state.filterValue = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
