import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from "./AppInput.module.css"
import {Button, Input} from "antd"

type PropsType = {
    addItem: (title: string) => void
}

const AppInput = (props: PropsType) => {

    let [error, setError] = useState<null | string>(null)
    let [title, setTitle] = useState('')

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div className={s.taskInput}>
        <Input value={title}
               placeholder='Add new item'
               onChange={changeTitle}
               onKeyPress={addTaskEnter}
               className={error ? s.error : ''}
        />
        <Button type='primary' shape="round" onClick={addTask}>+</Button>
        {error && <div className={s.errorMessage}>{error}</div>}
    </div>
}

export default AppInput
