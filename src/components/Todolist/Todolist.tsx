import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, removeTask } from "../../slices/tasksSlice";
import { RootState } from "../../store/store";
import { Filter } from "../Filter/Filter";
import s from "./Todolist.module.css";

type PropsType = {
  todoTitle: string;
};

const Todolist = (props: PropsType) => {
  const filterValue = useSelector(
    (state: RootState) => state.filter.filterValue
  );
  let tasks = useSelector((state: RootState) => state.tasks.tasks);
  console.log(tasks);
  const dispatch = useDispatch();

  const [filteredTask, setFilteredTask] = useState(tasks);

  const [newTask, setNewTask] = useState("");

  const onSubmit = () => {
    if (newTask.trim().length === 0) {
      alert("Enter a task before adding");
      return setNewTask("");
    }
    dispatch(
      addNewTask({
        newTaskText: newTask,
      })
    );
    return setNewTask("");
  };

  useEffect(() => {
    if (filterValue === 0) {
      setFilteredTask(tasks);
    }
    if (filterValue === 1) {
      setFilteredTask(tasks.filter((t) => t.isDone === false));
    }
    if (filterValue === 2) {
      setFilteredTask(tasks.filter((t) => t.isDone === true));
    }
  }, [filterValue, tasks]);

  return (
    <div className={s.box}>
      <h3>{props.todoTitle}</h3>
      <div>
        <input
          type="text"
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
            return (
              <li className={s.li} key={t.id}>
                <input type="checkbox" checked={t.isDone} />
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
