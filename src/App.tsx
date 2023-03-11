import s from "./App.module.css";
import Todolist, { TodolistType } from "./components/Todolist";

const todolists = [
  { id: 1, title: "Work", isDone: false },
  { id: 1, title: "Sleep", isDone: false },
  { id: 1, title: "Code", isDone: false },
];

function App() {
  return (
    <div className={s.flexbox}>
      <Todolist todolists={todolists}/>
      <Todolist todolists={todolists}/>
      <Todolist todolists={todolists}/>
    </div>
  );
}

export default App;
