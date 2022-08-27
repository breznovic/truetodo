import React from 'react'
import {Button, Checkbox, Input} from "antd"
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup"
import s from './Todolist.module.css'
import {FilterType, TaskType} from "../App"
import {DeleteTwoTone} from "@ant-design/icons"

type PropsType = {
    name: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
}

const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.name}</h3>
            <div className={s.taskInput}>
                <Input placeholder='Add new item'/>
                <Button type='primary' shape="round">+</Button>
            </div>
            {props.tasks.map(t =>
                <ul key={t.id}>
                    <li><Checkbox checked={t.isDone}/><span>{t.task} <DeleteTwoTone
                        onClick={() => props.deleteTask(t.id)}/></span></li>
                </ul>
            )}
            <div>
                <ButtonGroup changeFilter={props.changeFilter}/>
            </div>
        </div>
    )
}

export default Todolist
