import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { FilterType, TodolistType } from "../utils/types/types";
import { todolistAPI } from "../api/todolistsAPI";

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

export const fetchTodolists = createAsyncThunk<TodolistType[]>(
  "todolists/fetchTodolists",
  async (): Promise<TodolistType[]> => {
    const res = await todolistAPI.fetchTodolists();
    return res.data;
  }
);

export const createTodolist = createAsyncThunk(
  "todolists/createTodolist",
  async () => {
    const res = await todolistAPI.createTodolist;
    return res.name;
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
    builder.addCase(
      fetchTodolists.fulfilled,
      (state, action: PayloadAction<TodolistType[]>) => {
        state.loading = false;
        state.todolists = [...state.todolists, ...action.payload];
        return state;
      }
    );
    /*     builder.addCase(
      createTodolist.fulfilled,
      (state, action: PayloadAction<{ title: string }>) => {
        state.loading = false;
        let newTodolist: TodolistType = {
          filter: "all",
          id: nanoid(8),
          title: action.payload.title,
        };
        state.todolists.push(newTodolist);
        return state;
      }
    ); */
  },
});

export const { changeFilter } = todolistsSlice.actions;

export default todolistsSlice.reducer;
