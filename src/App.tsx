import s from "./App.module.css";
import Todolist from "./components/Todolist/Todolist";

function App() {
  return (
    <div className={s.flexbox}>
      <Todolist todoTitle="What to do" />
      <Todolist todoTitle="Tasks for today" />
      <Todolist todoTitle="What I'm going to do" />
    </div>
  );
}

export default App;
