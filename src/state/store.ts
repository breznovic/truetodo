import {combineReducers, createStore} from "redux"
import {tasksReducer} from "./reducers/tasksReducer"
import {todolistsReducer} from "./reducers/todolistsReducer"

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer)

