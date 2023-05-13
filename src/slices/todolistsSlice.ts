import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { FilterType, TodolistsType } from "../utils/types/types";

const initialState: TodolistsType = {
  todolists: [
    { id: nanoid(8), title: "Tasks for today", filter: "all" },
    { id: nanoid(8), title: "What to do", filter: "all" },
  ],
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ filterValue: FilterType; id: string }>
    ) => {
      
    },
  },
});

export const { changeFilter } = todolistsSlice.actions;

export default todolistsSlice.reducer;
