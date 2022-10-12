import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { dataReducer } from './slices/dataSlice'

const rootReducer = combineReducers({
	data: dataReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
