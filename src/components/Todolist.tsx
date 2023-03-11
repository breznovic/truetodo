import s from "./Todolist.module.css";

export type TodolistType = {
  id: number;
  title: string;
  isDone: boolean;
};

const Todolist = (props: TodolistType) => {
  return (
    <div className={s.box}>
      <h3>What to do</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <div>
        <ul>
          <li className={s.li}>
            <input type="checkbox"/>
            <span>{props.title}</span>
            <button>-</button>
          </li>
          <li className={s.li}>
            <input type="checkbox" />
            <span>Sleep</span>
            <button>-</button>
          </li>
          <li className={s.li}>
            <input type="checkbox" />
            <span>Code</span>
            <button>-</button>
          </li>
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
