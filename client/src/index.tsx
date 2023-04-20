import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { persistor } from '@services/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import '@services/translations'

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
