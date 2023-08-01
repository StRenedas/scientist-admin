import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './alertSlice'
import themeReducer from './themeSlice'
export const store = configureStore({
  reducer: {
    alert: alertReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
