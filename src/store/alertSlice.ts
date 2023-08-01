import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AlertState {
  text: string
  color: string
}

const initialState: AlertState = {
  text: '',
  color: '',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      state.color = 'success'
      state.text = action.payload
    },
    error: (state, action: PayloadAction<string>) => {
      state.color = 'danger'
      state.text = action.payload
    },
    clear: (state) => {
      state.color = ''
      state.text = ''
    },
  },
})

export const { success, error, clear } = alertSlice.actions

export default alertSlice.reducer
