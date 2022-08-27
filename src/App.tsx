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

    function addTask(title: string) {
        let newTask = {id: v1(), task: title, isDone: false}
        let addNewTask = [...tasks, newTask]
        setTasks(addNewTask)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className={s.img}>
            <div className={s.element}>
                <Todolist name='What to learn'
                          tasks={tasksForTodolist}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeStatus={changeStatus}
                />
            </div>
        </div>
    )
}

export default App
