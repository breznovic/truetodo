import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksType = {
  tasks: TaskType[];
};

const initialState: TasksType = {
  tasks: [
    { id: nanoid(8), title: "Work", isDone: false },
    { id: nanoid(8), title: "Sleep", isDone: false },
    { id: nanoid(8), title: "Code", isDone: false },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<string>) => {
      const newTasksArray = state.tasks.filter((t) => t.id !== action.payload);
      state.tasks = newTasksArray;
    },
  },
});

export const { removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
