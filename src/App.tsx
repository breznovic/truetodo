import s from "./App.module.css";
import Todolist from "./components/Todolist";

function App() {
  return (
    <div className={s.flexbox}>
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  );
}

export default App;
