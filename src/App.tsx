import React, {useState} from 'react'
import s from './App.module.css'
import Todolist from "./components/Todolist"
import {v1} from "uuid"
import AppInput from "./components/common/AppInput/AppInput";

export type TaskType = {
    id: string
    task: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TaskStateType = { [key: string]: TaskType[] }

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), task: 'HTML & CSS', isDone: true},
            {id: v1(), task: 'Javascript', isDone: true},
            {id: v1(), task: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), task: 'Milk', isDone: false},
            {id: v1(), task: 'Bread', isDone: true},
            {id: v1(), task: 'Book', isDone: true},
        ],
    })

    function changeFilter(value: FilterType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function deleteTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), task: title, isDone: false}
        let todolistsTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistsTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(t => t.id === taskId)
        if (task) {
            task.task = newTitle
            setTasks({...tasks})
        }
    }

    return <div className={s.img}>
        <div className={s.element}>
            <div className={s.input}><AppInput addItem={addTodolist}/></div>
            {
                todolists.map(tl => {

                        let allTodolistsTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistsTasks

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistsTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistsTasks.filter(t => t.isDone)
                        }

                        return <div className={s.todo}>
                            <Todolist key={tl.id}
                                      name={tl.title}
                                      tasks={tasksForTodolist}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeStatus={changeStatus}
                                      filter={tl.filter}
                                      id={tl.id}
                                      removeTodolist={removeTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                            />
                        </div>
                    }
                )
            }
        </div>
    </div>
}

export default App