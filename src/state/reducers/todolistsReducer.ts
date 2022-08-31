import {FilterType, TodolistType} from "../../App"
import {v1} from "uuid"

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
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
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TD-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterType => {
    return {type: "CHANGE-TD-FILTER", filter, id}
}