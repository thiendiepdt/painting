import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk<R> = ThunkAction<R, RootState, unknown, Action<string>>

export default store
