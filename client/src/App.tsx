import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesStack from '@services/routers'
import { ToastContainer } from 'react-toastify'
import '@assets/css/styles.css'

const App: React.FC = () => {
    return (
        <div className="h-full relative">
            <BrowserRouter>
                <RoutesStack />
            </BrowserRouter>
            <ToastContainer />
        </div>
    )
}

export default App
