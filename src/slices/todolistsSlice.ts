import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TodolistsType } from "../utils/types/types";

const initialState: TodolistsType = {
  todolists: [
    { id: nanoid(8), title: "Work", filter: "all" },
    { id: nanoid(8), title: "Sleep", filter: "all" },
  ],
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    deleteTodolist: (state, action) => {
        
    },
  },
});

export const { deleteTodolist } = todolistsSlice.actions;

export default todolistsSlice.reducer;
