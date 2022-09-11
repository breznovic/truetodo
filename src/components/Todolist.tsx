import React, {useCallback} from 'react'
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup/ButtonGroup"
import s from './Todolist.module.css'
import {FilterType, TaskType} from "../App"
import {DeleteTwoTone} from "@ant-design/icons"
import {AppInput} from "./common/AppInput/AppInput"
import {EditableSpan} from "./common/EditableSpan/EditableSpan"
import {addTaskAC} from "../state/reducers/tasksReducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootState} from "../state/store"
import {Task} from "./common/Task/Task"

type PropsType = {
    name: string
    changeFilter: (value: FilterType, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, TaskType[]>((state) => state.tasks[props.id])

    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) =>
        props.changeTodolistTitle(props.id, newTitle), [props.changeTodolistTitle, props.id])

    let allTodolistsTasks = tasks
    let tasksForTodolist = allTodolistsTasks

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistsTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistsTasks.filter(t => t.isDone)
    }

    return <div>
        <div className={s.title}>
            <h3><EditableSpan title={props.name} onChange={changeTodolistTitle}/>{}
                <DeleteTwoTone onClick={removeTodolist} className={s.button}/>
            </h3>
        </div>
        <AppInput addItem={(title) => {
            dispatch(addTaskAC(title, props.id))
        }}/>
        {tasksForTodolist.map(t => <Task task={t} todolistId={props.id} key={props.id}/>)}
        <div>
            <ButtonGroup changeFilter={props.changeFilter}
                         filter={props.filter}
                         id={props.id}
            />
        </div>
    </div>
})

