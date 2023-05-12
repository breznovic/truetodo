import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  changeTaskStatus,
  removeTask,
} from "../../slices/tasksSlice";
import { RootState } from "../../store/store";
import { Filter } from "../Filter/Filter";
import s from "./Todolist.module.css";
import { TodolistType } from "../../utils/types/types";

const Todolist = (props: TodolistType) => {
  
  let tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch();

  const [filteredTask, setFilteredTask] = useState(tasks);

  const [newTask, setNewTask] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    if (newTask.trim().length === 0) {
      alert("Enter a task before adding");
      return setNewTask("");
    } else {
      setError("Enter a task");
    }
    dispatch(
      addNewTask({
        newTaskText: newTask,
      })
    );
    return setNewTask("");
  };

  return (
    <div className={s.box}>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTask}
          type="text"
          className={error ? "error" : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTask(e.target.value)
          }
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSubmit();
            }
          }}
        />
        <button onClick={onSubmit}>+</button>
      </div>
      <div>
        <ul>
          {filteredTask.map((t) => {
            const deleteTask = (taskId: string) => {
              dispatch(removeTask(taskId));
            };

            const TaskStatusHandler = () => {
              dispatch(changeTaskStatus({ taskId: t.id, isDone: !t.isDone }));
            };

            return (
              <li className={s.li} key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={TaskStatusHandler}
                />
                {t.isDone === false ? (
                  <span>{t.title} </span>
                ) : (
                  <span className={s.taskIsDone}>{t.title} </span>
                )}
                <button onClick={() => deleteTask(t.id)}>-</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Filter />
      </div>
    </div>
  );
};

export default Todolist;
