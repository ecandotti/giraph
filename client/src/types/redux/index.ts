import store from '@services/redux/store'

/**
 * @type { AppDispatch }
 * AppDispatch type to manage redux state
 */
export type AppDispatch = typeof store.dispatch

/**
 * @type { RootState }
 * RootState type to get redux state
 */
export type RootState = ReturnType<typeof store.getState>
