import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  headers: { "API-KEY": "86a95b02-e99d-4ef6-baff-bdf2abdad209" },
});

export const todolistAPI = {
  fetchTodolists() {
    return instance.get(`/todo-lists`);
  },
  createTodolist() {},
  deleteTodolist() {},
  changeTodolistTitle() {},
};
