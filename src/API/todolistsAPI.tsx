import React, {useEffect, useState} from 'react'
import axios from 'axios'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '86a95b02-e99d-4ef6-baff-bdf2abdad209'
    }
}

export const todolistAPI = {

    getTodolists() {
        const promise = axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: title}, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title: title}, settings)
        return promise
    }
}


