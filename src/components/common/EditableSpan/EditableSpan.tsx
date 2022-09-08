import React, {ChangeEvent, useState} from 'react'
import {Input} from "antd"

type PropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const [editTask, setEditTask] = useState('')

    const activateEditMode = () => {
        setEdit(true)
        setEditTask(props.title)
    }

    const activateViewMode = () => {
        setEdit(false)
        props.onChange(editTask)
    }

    const changeTask = (e: ChangeEvent<HTMLInputElement>) => setEditTask(e.target.value)

    return edit ? <Input value={editTask} onBlur={activateViewMode} autoFocus onChange={changeTask}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
})

