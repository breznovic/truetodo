import React, {ChangeEvent, useState} from 'react'
import {Input} from "antd"

type PropsType = {
    task: string
    onChange: (newValue: string) => void
}

const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const [editTask, setEditTask] = useState('')

    const activateEditMode = () => {
        setEdit(true)
        setEditTask(props.task)
    }

    const activateViewMode = () => {
        setEdit(false)
        props.onChange(editTask)
    }

    const changeTask = (e: ChangeEvent<HTMLInputElement>) => setEditTask(e.target.value)

    return edit ? <Input value={editTask} onBlur={activateViewMode} autoFocus onChange={changeTask}/> :
        <span onDoubleClick={activateEditMode}>{props.task}</span>
}

export default EditableSpan
