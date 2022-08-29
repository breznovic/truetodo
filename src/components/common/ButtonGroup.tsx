import React from "react"
import {Button} from "antd"
import {FilterType} from "../../App"

type PropsType = {
    changeFilter: (value: FilterType, todolistId: string) => void
    id: string
    filter: FilterType
}

export const ButtonGroup: (props: PropsType) => JSX.Element = (props: PropsType) => {

    const allFilter = () => props.changeFilter('all', props.id)
    const activeFilter = () => props.changeFilter('active', props.id)
    const completedFilter = () => props.changeFilter('completed', props.id)

    return <div>
        <Button onClick={allFilter}>All</Button>
        <Button onClick={activeFilter}>Active</Button>
        <Button onClick={completedFilter}>Completed</Button>
    </div>
}