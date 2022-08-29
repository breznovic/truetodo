import React, {useState} from 'react'
import s from './App.module.css'
import Todolist from "./components/Todolist"
import {v1} from "uuid"

export type TaskType = {
    id: string
    task: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), task: 'HTML & CSS', isDone: true},
        {id: v1(), task: 'Javascript', isDone: true},
        {id: v1(), task: 'React', isDone: false},
    ])

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    function changeFilter(value: FilterType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function deleteTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
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
                {
                    todolists.map(tl => {

                            let tasksForTodolist = tasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasks.filter(t => t.isDone)
                            }

                            return <Todolist key={tl.id}
                                             name={tl.title}
                                             tasks={tasksForTodolist}
                                             deleteTask={deleteTask}
                                             changeFilter={changeFilter}
                                             addTask={addTask}
                                             changeStatus={changeStatus}
                                             filter={tl.filter}
                                             id={tl.id}
                            />
                        }
                    )
                }
            </div>
        </div>
    )
}

export default App
