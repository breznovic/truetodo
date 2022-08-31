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

    const addNewTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    function deleteTask(taskId: string, todolistId: string) {
        dispatch(deleteTaskAC(taskId, todolistId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, todolistId, isDone))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    return <div>
        <div className={s.title}>
            <h3><EditableSpan task={props.name} onChange={changeTodolistTitle}/>{}
                <DeleteTwoTone onClick={removeTodolist} className={s.button}/>
            </h3>
        </div>
        <AppInput addItem={addNewTask}/>
        {tasks.map((t) => {

            const deleteTDTask = () => deleteTask(taskId, todolistId)
            const changeStatus = (e: CheckboxChangeEvent) => {
                changeTaskStatus(t.id, e.target.checked, props.id)
            }
            const changeTask = (newValue: string) => {
                changeTaskTitle(t.id, newValue, props.id)
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
