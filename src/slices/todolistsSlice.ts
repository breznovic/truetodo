import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { FilterType, TodolistType } from "../utils/types/types";
import axios from "axios";

type InitialstateType = {
  todolists: TodolistType[];
  loading: boolean;
  error: null | string;
};

const initialState: InitialstateType = {
  todolists: [],
  loading: false,
  error: null,
};

const baseUrl = "https://social-network.samuraijs.com/api/1.1";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "86a95b02-e99d-4ef6-baff-bdf2abdad209",
  },
};

export const fetchTodolists = createAsyncThunk(
  "todolists/fetchTodolists",
  async () => {
    const res = await axios.get(baseUrl + "/todo-lists", settings);
    return res.data;
  }
);

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ filterValue: FilterType; id: string }>
    ) => {
      const { filterValue, id } = action.payload;
      const todoListFilter = state.todolists.find((td) => td.id === id);
      if (todoListFilter) {
        todoListFilter.filter = filterValue;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      state.loading = false;
      state.todolists.push(action.payload);
    });
  },
});

export const { changeFilter } = todolistsSlice.actions;

export default todolistsSlice.reducer;
