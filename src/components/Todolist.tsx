import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import {Button, Checkbox, Input} from "antd"
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup"
import s from './Todolist.module.css'
import {FilterType, TaskType} from "../App"
import {DeleteTwoTone} from "@ant-design/icons"
import {CheckboxChangeEvent} from "antd/es/checkbox"

type PropsType = {
    name: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (task: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.name}</h3>
            <div className={s.taskInput}>
                <Input value={title}
                       placeholder='Add new item'
                       onChange={changeTitle}
                       onKeyPress={addTaskEnter}
                />
                <Button type='primary' shape="round" onClick={addTask}>+</Button>
            </div>
            {props.tasks.map((t) => {

                const deleteTask = () => props.deleteTask(t.id)
                const changeStatus = (e: CheckboxChangeEvent) => {
                    props.changeStatus(t.id, e.target.checked)
                }

                return <li key={t.id} className={s.li}>
                    <Checkbox checked={t.isDone}
                              onChange={changeStatus}
                    />
                    <span className={s.span}>{t.task} <DeleteTwoTone onClick={deleteTask}/></span>
                </li>
            })}
            <div>
                <ButtonGroup changeFilter={props.changeFilter}/>
            </div>
        </div>
    )
}

export default Todolist
