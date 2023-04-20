import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import member from '@features/member/memberSlice'
import project from '@features/project/projectSlice'
import { RootState } from '@/types/redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { MODE } from '@configs/env'
import { TOKEN_APP_KEY } from '@configs/token'
import thunk from 'redux-thunk'

const persistConfig = {
    key: TOKEN_APP_KEY,
    version: 1,
    storage,
    blacklist: []
}

/**
 * Insert into your slice into reducer object
 *
 * @returns All reducers.
 */
const rootReducer = combineReducers({
    member,
    project
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Insert into your slice into reducer object
 *
 * @returns A configured Redux store.
 */
const store = configureStore({
    reducer: persistedReducer,
    devTools: MODE === 'development',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                isSerializable: () => true
            }
        }).concat(thunk)
})

/**
 * Mock store for Jest
 *
 * @returns A configured Redux store.
 */
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: {
            member,
            project
        },
        preloadedState
    })
}

export const persistor = persistStore(store)

export default store
