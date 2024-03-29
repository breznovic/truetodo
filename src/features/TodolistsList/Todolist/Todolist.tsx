import React, { useCallback, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import {
  FilterValuesType,
  TodolistDomainType,
} from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { TaskType } from "features/TodolistsList/todolists.api";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import s from "./Todolist.module.css";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist = React.memo(function (props: PropsType) {
  const { fetchTasks } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }

  return (
    <div style={{ color: "#fadb6f" }}>
      <h3 className={s.titleColor}>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitle}
        />
        <IconButton
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <ClearIcon color={"warning"} />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === "loading"}
        label="Enter new task"
      />
      <div className={s.taskColor}>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <div className={s.buttons}>
        <Button
          variant={props.todolist.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
          color={"info"}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
