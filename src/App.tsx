import React, {useCallback} from 'react'
import s from './App.module.css'
import {Todolist} from "./components/Todolist"
import {AppInput} from "./components/common/AppInput/AppInput"
import {useDispatch, useSelector} from "react-redux"
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/reducers/todolistsReducer"
import {AppRootState} from "./state/store"

export type TaskType = {
    id: string
    title: string
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

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    return <div className={s.img}>
        <div className={s.element}>
            <div className={s.input}><AppInput addItem={addTodolist}/></div>
            {
                todolists.map(tl => {

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