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
    task: string
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
            const newTask = {id: v1(), task: action.task, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.task = action.newTitle
            }
            return stateCopy
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

export const addTaskAC = (task: string, todolistId: string): AddTaskType => {
    return {type: "ADD-TASK", task, todolistId}
}

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone}
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, newTitle: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todolistId, newTitle}
}
