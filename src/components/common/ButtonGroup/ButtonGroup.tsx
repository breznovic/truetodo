import React, {useCallback} from "react"
import {Button} from "antd"
import {FilterType} from "../../../App"

type PropsType = {
    changeFilter: (value: FilterType, todolistId: string) => void
    id: string
    filter: FilterType
}

export const ButtonGroup: (props: PropsType) => JSX.Element = (props: PropsType) => {

    const allFilter = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const activeFilter = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const completedFilter = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    return <div>
        <Button onClick={allFilter}>All</Button>
        <Button onClick={activeFilter}>Active</Button>
        <Button onClick={completedFilter}>Completed</Button>
    </div>
}