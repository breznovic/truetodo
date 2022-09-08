import {TaskStateType} from "../../App"
import {v1} from "uuid"
import {AddTodolistType, RemoveTodolistType} from "./todolistsReducer"


export type DeleteTaskType = {
    type: 'DELETE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    newTitle: string
}

type ActionsType = DeleteTaskType |
    AddTaskType |
    ChangeTaskTitleType |
    ChangeTaskStatusType |
    AddTodolistType |
    RemoveTodolistType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            // state[action.todolistId] = todolistTasks.map
            // (t => t.id === action.taskId
            //     ? {...t, title: action.newTitle} : t)
            return ({...state,[action.todolistId]:todolistTasks.map
                (t => t.id === action.taskId
                    ? {...t, title: action.newTitle} : t)})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const deleteTaskAC = (taskId: string, todolistId: string): DeleteTaskType => {
    return {type: "DELETE-TASK", taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone}
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, newTitle: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todolistId, newTitle}
}
