import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../slices/tasksSlice";
import todolistsReducer from "../slices/todolistsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
