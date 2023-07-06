export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksType = { tasks: TaskType[] };

export type FilterType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
