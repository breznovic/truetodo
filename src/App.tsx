import { useSelector } from "react-redux";
import s from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";
import { RootState } from "./store/store";

function App() {
  let todolists = useSelector((state: RootState) => state.todolists.todolists);

  return (
    <div className={s.flexbox}>
      {todolists.map((td) => {
        return (
          <Todolist
            id={td.id}
            title={td.title}
            filter={td.filter}
            key={td.id}
          />
        );
      })}
    </div>
  );
}

export default App;
