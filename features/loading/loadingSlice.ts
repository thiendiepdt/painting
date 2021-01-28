import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true
    },
    finish: (state) => {
      state.isLoading = false
    },
  },
})

export const { loading, finish } = loadingSlice.actions

export default loadingSlice.reducer

export const selectIsLoading = (state: RootState): LoadingState['isLoading'] =>
  state.loading.isLoading
