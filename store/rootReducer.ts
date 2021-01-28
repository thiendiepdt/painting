import counterReducer from '../features/counter/counterSlice'
import loadingReducer from '../features/loading/loadingSlice'

import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({
  counter: counterReducer,
  loading: loadingReducer,
})
export default rootReducer
