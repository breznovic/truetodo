import React, {useEffect, useState} from 'react'
import axios from 'axios'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '86a95b02-e99d-4ef6-baff-bdf2abdad209'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistAPI = {

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}


