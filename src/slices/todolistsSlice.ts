import { PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { FilterType, TodolistsType } from "../utils/types/types";


type InitialstateType = {
  todolists: TodolistsType[]
  loading: boolean
  error: null | string
}

const initialState: InitialstateType = {
  todolists: [],
  loading: false,
  error: null,
};

const fetchTodolists = createAsyncThunk(
  'todolists/fetchTodolists',
  async (todolists) => {
    const res = await 
    return res.data
  }
)


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
});

export const { changeFilter } = todolistsSlice.actions;

export default todolistsSlice.reducer;


