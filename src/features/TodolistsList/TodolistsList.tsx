import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FilterValuesType,
  todolistsActions,
  todolistsThunks,
} from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { Container, Grid, Paper, ThemeProvider } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { TaskStatuses } from "common/enums";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    removeTodolist: removeTodolistThunk,
    addTodolist: addTodolistThunk,
    fetchTodolists,
    changeTodolistTitle: changeTodolistTitleThunk,
  } = useActions(todolistsThunks);

  const {
    addTask: addTaskThunk,
    removeTask: removeTaskThunk,
    updateTask,
  } = useActions(tasksThunks);
  const { changeTodolistFilter } = useActions(todolistsActions);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const removeTask = useCallback(function (taskId: string, todolistId: string) {
    removeTaskThunk({ taskId, todolistId });
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    addTaskThunk({ title, todolistId });
  }, []);

  const changeStatus = useCallback(function (
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    updateTask({ taskId, domainModel: { status }, todolistId });
  }, []);

  const changeTaskTitle = useCallback(function (
    taskId: string,
    title: string,
    todolistId: string
  ) {
    updateTask({ taskId, domainModel: { title }, todolistId });
  }, []);

  const changeFilter = useCallback(function (
    filter: FilterValuesType,
    id: string
  ) {
    changeTodolistFilter({ id, filter });
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    removeTodolistThunk(id);
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    changeTodolistTitleThunk({ id, title });
  }, []);

  const addTodolist = useCallback((title: string) => {
    addTodolistThunk(title);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <Container
          fixed
          sx={{
            width: { xs: "350px", sm: "1000px", md: "1200px", xl: "1500px" },
            paddingRight: { xs: "20px" },
          }}
        >
          <Grid container style={{ padding: "20px" }}>
            <Paper
              sx={{
                padding: "10px",
                margin: "75px 0px 0px 0px",
                backgroundColor: "#edec89",
              }}
              elevation={6}
            >
              <AddItemForm
                addItem={addTodolist}
                label="Enter new Todolist title"
              />
            </Paper>
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{ flexDirection: { xs: "column", sm: "row", xl: "row" } }}
          >
            {todolists.map((tl) => {
              let allTodolistTasks = tasks[tl.id];
              return (
                <Grid item xs="auto" sm={6} md={6} lg={4} xl="auto" key={tl.id}>
                  <Paper
                    sx={{
                      padding: "10px",
                      backgroundColor: "#edec89",
                      marginLeft: "20px",
                    }}
                    elevation={12}
                  >
                    <Todolist
                      todolist={tl}
                      tasks={allTodolistTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
};
