import s from "./Todolist.module.css";

const Todolist = () => {
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
            <input type="checkbox" />
            <span>Work</span>
          </li>
          <li className={s.li}>
            <input type="checkbox" />
            <span>Sleep</span>
          </li>
          <li className={s.li}>
            <input type="checkbox" />
            <span>Code</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
