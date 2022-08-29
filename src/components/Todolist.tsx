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
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (task: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
}

const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    return <div>
        <div className={s.title}>
            <h3>{props.name}</h3>
            <DeleteTwoTone onClick={removeTodolist} className={s.button}/>
        </div>
        <div className={s.taskInput}>
            <Input value={title}
                   placeholder='Add new item'
                   onChange={changeTitle}
                   onKeyPress={addTaskEnter}
                   className={error ? s.error : ''}
            />
            <Button type='primary' shape="round" onClick={addTask}>+</Button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        {props.tasks.map((t) => {

            const deleteTask = () => props.deleteTask(t.id, props.id)
            const changeStatus = (e: CheckboxChangeEvent) => {
                props.changeStatus(t.id, e.target.checked, props.id)
            }

            return <div className={t.isDone ? s.isDone : ''}>
                <li key={t.id} className={s.li}>
                    <Checkbox checked={t.isDone}
                              onChange={changeStatus}
                    />
                    <span className={s.span}>{t.task} <DeleteTwoTone onClick={deleteTask}/></span>
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
