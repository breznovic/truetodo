import React from 'react'
import {Checkbox} from "antd"
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup/ButtonGroup"
import s from './Todolist.module.css'
import {FilterType, TaskType} from "../App"
import {DeleteTwoTone} from "@ant-design/icons"
import {CheckboxChangeEvent} from "antd/es/checkbox"
import AppInput from "./common/AppInput/AppInput"
import EditableSpan from "./common/EditableSpan/EditableSpan"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../state/reducers/tasksReducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootState} from "../state/store"

type PropsType = {
    name: string
    changeFilter: (value: FilterType, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

const Todolist = (props: PropsType) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, TaskType[]>((state) => state.tasks[props.id])

    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

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
            <h3><EditableSpan task={props.name} onChange={changeTodolistTitle}/>{}
                <DeleteTwoTone onClick={removeTodolist} className={s.button}/>
            </h3>
        </div>
        <AppInput addItem={(title) => {
            dispatch(addTaskAC(title, props.id))
        }}/>
        {tasksForTodolist.map((t) => {

            const deleteTDTask = () => dispatch(deleteTaskAC(t.id, props.id))

            const changeStatus = (e: CheckboxChangeEvent) => {
                let targetCheck = e.target.checked
                dispatch(changeTaskStatusAC(t.id, props.id, targetCheck))
            }

            const changeTask = (newValue: string) => {
                dispatch(changeTaskTitleAC(t.id, newValue, props.id))
            }

            return <div className={t.isDone ? s.isDone : ''}>
                <li key={t.id} className={s.li}>
                    <Checkbox checked={t.isDone}
                              onChange={changeStatus}
                    />
                    <span className={s.span}>
                        <EditableSpan task={t.task} onChange={changeTask}/>
                        <DeleteTwoTone onClick={deleteTDTask}/></span>
                </li>
            </div>
        })}
        <div>
            <ButtonGroup changeFilter={props.changeFilter}
                         filter={props.filter}
                         id={props.id}
            />
        </div>
    </div>
}

export default Todolist
