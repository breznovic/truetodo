import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../slices/tasksSlice";
import filterReducer from "../slices/filterSlice";
import todolistsReducer from "../slices/todolistsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    todolists: todolistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
