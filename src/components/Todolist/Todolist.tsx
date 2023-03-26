import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../../slices/tasksSlice";
import { RootState } from "../../store/store";
import { TaskType } from "../../utils/types/types";
import { Filter } from "../Filter/Filter";
import s from "./Todolist.module.css";

const Todolist = () => {
  const filterValue = useSelector(
    (state: RootState) => state.filter.filterValue
  );
  let tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [filteredTask, setFilteredTask] = useState(tasks);

  const dispatch = useDispatch();

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
  }, [filterValue]);

  return (
    <div className={s.box}>
      <h3>What to do</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <div>
        <ul>
          {filteredTask.map((t: TaskType) => {
            const deleteTask = (taskId: string) => {
              dispatch(removeTask(taskId));
            };

            return (
              <li className={s.li} key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
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
