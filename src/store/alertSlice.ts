import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

export interface AlertState {
  show: boolean
  text: string
  color: AlertColor
}

const initialState: AlertState = {
  show: false,
  text: '',
  color: 'info',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      state.show = true
      state.color = 'success'
      state.text = action.payload
    },
    error: (state, action: PayloadAction<string>) => {
      state.show = true
      state.color = 'error'
      state.text = action.payload
    },
    close: (state) => {
      state.show = false
    },
  },
})

export const { success, error, close } = alertSlice.actions

export default alertSlice.reducer
