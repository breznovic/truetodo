import React from 'react'
import s from './App.module.css'
import Todolist from "./components/Todolist"
import AppInput from "./components/common/AppInput/AppInput"
import {useDispatch, useSelector} from "react-redux"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/reducers/tasksReducer"
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/reducers/todolistsReducer"
import {AppRootState} from "./state/store"

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

export type TaskStateType = { [key: string]: TaskType[] }

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks)

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    function changeFilter(value: FilterType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
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
                                      changeFilter={changeFilter}
                                      filter={tl.filter}
                                      id={tl.id}
                                      removeTodolist={removeTodolist}
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