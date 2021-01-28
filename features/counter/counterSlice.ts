import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import { delay } from '../../utils/functions'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
      return state
    },
    decrement: (state) => {
      state.value--
      return state
    },
    add: (state, action: PayloadAction<{ amount: number }>) => {
      state.value += action.payload.amount
      return state
    },
  },
})

export const { increment, decrement, add } = counterSlice.actions

export const addAmount = (amount: number): AppThunk<Promise<void>> => async (dispatch) => {
  await delay(1000)
  dispatch(
    add({
      amount,
    })
  )
  await dispatch(fetchTime(10))
  await dispatch(fetchTime(20))
  await Promise.all([dispatch(fetchTime(11)), dispatch(fetchTime(22))])
}

export const fetchTime = (time: number): AppThunk<Promise<number>> => async () => {
  await delay(1000)
  console.warn(time)
  return time
}

export const selectCounterValue = (state: RootState): CounterState['value'] => state.counter.value

export default counterSlice.reducer
