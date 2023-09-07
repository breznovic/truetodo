import React, { ChangeEvent, useCallback } from "react";
import { IconButton } from "@mui/material";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
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
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]
  );

  const onChangeHandler = useCallback(
    (e: CheckboxChangeEvent) => {
      let newIsDoneValue = e.target.checked;
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      );
    },
    [props.task.id, props.todolistId]
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.task.id, props.todolistId]
  );

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
