import { useDispatch, useSelector } from "react-redux";
import s from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";
import { AppDispatch, RootState } from "./store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { createTodolist, fetchTodolists } from "./slices/todolistsSlice";

function App() {
  let todolists = useSelector((state: RootState) => state.todolists.todolists);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolists());
  }, [dispatch]);

  const [newTD, setNewTD] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    if (newTD.trim().length === 0) {
      alert("Enter a task before adding");
      return setNewTD("");
    } else {
      setError("Enter a task");
    }
    dispatch(createTodolist());
    return setNewTD("");
  };

  return (
    <>
      <input
        value={newTD}
        type="text"
        className={error ? "error" : ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTD(e.target.value)
        }
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <button onClick={onSubmit}>+</button>

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
    </>
  );
}

export default App;
