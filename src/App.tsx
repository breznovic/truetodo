import React from 'react'
import s from './App.module.css'
import Todolist from "./components/Todolist"

function App() {
    return (
        <div className={s.img}>
            <div className={s.element}>
                <Todolist/>
            </div>
        </div>
    )
}

export default App;
