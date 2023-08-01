import { createSlice } from '@reduxjs/toolkit'
export interface AlertState {
  isDark: boolean
}

const initialState: AlertState = {
  isDark: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark
    },
  },
})

export const { toggle } = themeSlice.actions

export default themeSlice.reducer
