import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Main: React.FC = () => {
    return (
        <div className="h-full w-full text-slate-800 dark:text-slate-200 transition-colors">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Main
