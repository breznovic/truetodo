import React, {useState} from 'react'
import s from './App.module.css'
import Todolist from "./components/Todolist"
import {v1} from "uuid"

export type TaskType = {
    id: string
    task: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), task: 'HTML & CSS', isDone: true},
        {id: v1(), task: 'Javascript', isDone: true},
        {id: v1(), task: 'React', isDone: false},
    ])

    // const tasks2 = [
    //     {id: v1(), task: 'Milk', isDone: false},
    //     {id: v1(), task: 'Bread', isDone: true},
    //     {id: v1(), task: 'Book', isDone: false},
    // ]

    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function deleteTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    return (
        <div className={s.img}>
            <div className={s.element}>
                <Todolist name='What to learn'
                          tasks={tasksForTodolist}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default App
