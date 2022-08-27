import React from "react"
import {Button} from "antd"
import {FilterType} from "../../App"

type PropsType = {
    changeFilter: (value: FilterType) => void
}

export const ButtonGroup: (props: PropsType) => JSX.Element = (props: PropsType) => {

    const allFilter = () => props.changeFilter('all')
    const activeFilter = () => props.changeFilter('active')
    const completedFilter = () => props.changeFilter('completed')

    return <div>
        <Button onClick={allFilter}>All</Button>
        <Button onClick={activeFilter}>Active</Button>
        <Button onClick={completedFilter}>Completed</Button>
    </div>
}