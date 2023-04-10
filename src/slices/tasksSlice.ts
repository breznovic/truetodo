import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TasksType, TaskType } from "../utils/types/types";

const initialState: TasksType = {
  tasks: [
    { id: nanoid(8), title: "Work", isDone: true },
    { id: nanoid(8), title: "Sleep", isDone: false },
    { id: nanoid(8), title: "Code", isDone: false },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<{ newTaskText: string }>) => {
      const newTask: TaskType = {
        title: action.payload.newTaskText,
        isDone: false,
        id: nanoid(8),
      };
      state.tasks.unshift(newTask);
    },
    removeTask: (state, action: PayloadAction<string>) => {
    
      const newTasksArray = state.tasks.filter((t) => t.id !== action.payload);
      state.tasks = newTasksArray;
      return state
    },
  },
});

export const { removeTask, addNewTask } = tasksSlice.actions;

export default tasksSlice.reducer;