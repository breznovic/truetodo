import { useDispatch, useSelector } from "react-redux";
import s from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";
import { RootState } from "./store/store";
import { useEffect } from "react";
import { fetchTodolists } from "./slices/todolistsSlice";

function App() {
  let todolists = useSelector((state: RootState) => state.todolists.todolists);

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchTodolists())
  }, []);


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
