import {useDispatch} from "react-redux"
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../../state/reducers/tasksReducer"
import {CheckboxChangeEvent} from "antd/es/checkbox"
import s from "../../Todolist.module.css"
import {Checkbox} from "antd"
import {EditableSpan} from "../EditableSpan/EditableSpan"
import {DeleteTwoTone} from "@ant-design/icons"
import React, {useCallback} from "react"
import {TaskType} from "../../../App"

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const deleteTDTask = useCallback(() =>
        dispatch(deleteTaskAC(props.task.id, props.todolistId)), [props.task.id, props.todolistId, dispatch])

    const changeStatus = useCallback((e: CheckboxChangeEvent) => {
        let targetCheck = e.target.checked
        dispatch(changeTaskStatusAC(props.task.id, props.todolistId, targetCheck))
    }, [props.task.id, props.todolistId, dispatch])

    const changeTask = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, props.todolistId, newTitle))
    }, [props.task.id, props.todolistId, dispatch])

    return <div className={props.task.isDone ? s.isDone : ''}>
        <li key={props.task.id} className={s.li}>
            <Checkbox checked={props.task.isDone}
                      onChange={changeStatus}
            />
            <span className={s.span}>
                        <EditableSpan title={props.task.title} onChange={changeTask}/>
                        <DeleteTwoTone onClick={deleteTDTask}/></span>
        </li>
    </div>
})