import { useDispatch, useSelector } from "react-redux";
import { removeTask, TaskType } from "../slices/tasksSlice";
import { RootState } from "../store/store";
import s from "./Todolist.module.css";

const Todolist = () => {
  let tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div className={s.box}>
      <h3>What to do</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <div>
        <ul>
          {tasks.map((t: TaskType) => {
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
        <button className={s.button}>All</button>
        <button className={s.button}>Active</button>
        <button className={s.button}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
