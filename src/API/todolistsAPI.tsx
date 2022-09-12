import React, {useEffect, useState} from 'react'
import axios from 'axios'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTDResponseType = {
    resultCode: number
    messages: string[]
    data: {
        item: TodolistType
    }
}

type DeleteTDResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}

type UpdateTDResponseType = {
    resultCode: number
    messages: string[]
    data: {}
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
        const promise = axios.post<CreateTDResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: title}, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<DeleteTDResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = axios.put<UpdateTDResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title: title}, settings)
        return promise
    }
}


