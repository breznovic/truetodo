import React from 'react'
import {Button, Checkbox, Input} from "antd"
import 'antd/dist/antd.css'
import {ButtonGroup} from "./common/ButtonGroup";
import s from './Todolist.module.css'

const Todolist = () => {

    return (
        <div>
            <h3>What to learn</h3>
            <div className={s.taskInput}>
                <Input placeholder='Add new task'/>
                <Button type='primary' shape="round">+</Button>
            </div>
            <ul>
                <li><Checkbox checked={true}/><span>HTML&CSS</span></li>
                <li><Checkbox checked={true}/><span>JS</span></li>
                <li><Checkbox checked={false}/><span>React</span></li>
            </ul>
            <div>
               <ButtonGroup/>
            </div>
        </div>
    )
}

export default Todolist
