import {FilterType, TodolistType} from "../../App"
import {v1} from "uuid";

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TD-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TD-FILTER'
    id: string
    filter: FilterType
}

type ActionsType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TD-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TD-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error('Unknown action type')
    }
}

export const RemoveTodolist = (todolistId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const AddTodolist = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title}
}

export const ChangeTodolistTitle = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TD-TITLE', id, title}
}

export const ChangeTodolistFilter = (id: string, filter: FilterType): ChangeTodolistFilterType => {
    return {type: "CHANGE-TD-FILTER", filter, id}
}