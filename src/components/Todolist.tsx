import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import {Button, Checkbox, Input} from "antd"
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup/ButtonGroup"
import s from './Todolist.module.css'
import {FilterType, TaskType} from "../App"
import {DeleteTwoTone} from "@ant-design/icons"
import {CheckboxChangeEvent} from "antd/es/checkbox"
import AppInput from "./common/AppInput/AppInput";
import EditableSpan from "./common/EditableSpan/EditableSpan";

type PropsType = {
    name: string
    tasks: TaskType[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (task: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

const Todolist = (props: PropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <div className={s.title}>
            <h3><EditableSpan task={props.name} onChange={changeTodolistTitle} />{}
                <DeleteTwoTone onClick={removeTodolist} className={s.button}/>
            </h3>
        </div>
        <AppInput addItem={addTask}/>
        {props.tasks.map((t) => {

            const deleteTask = () => props.deleteTask(t.id, props.id)
            const changeStatus = (e: CheckboxChangeEvent) => {
                props.changeStatus(t.id, e.target.checked, props.id)
            }
            const changeTask = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue, props.id)
            }

            return <div className={t.isDone ? s.isDone : ''}>
                <li key={t.id} className={s.li}>
                    <Checkbox checked={t.isDone}
                              onChange={changeStatus}
                    />
                    <span className={s.span}>
                        <EditableSpan task={t.task} onChange={changeTask}/>
                        <DeleteTwoTone onClick={deleteTask}/></span>
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
