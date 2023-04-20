import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'
import { useAppSelector } from '@hooks/redux'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Button from '@components/Button/Button'

const Unconnected: React.FC = () => {
    const { token } = useAppSelector(state => state.member)
    const navigate = useNavigate()

    useEffect(() => {
        if (token !== null) {
            navigate(ROUTER_URLS.HOME)
        }
    }, [token])

    return (
        <div className="relative h-full w-full flex flex-col text-slate-800 dark:text-slate-200 transition-colors">
            <div className="absolute top-4 left-4">
                <Button
                    title="Retour"
                    Icon={() => <AiOutlineArrowLeft className="mr-2" color="white" />}
                    onClick={() => navigate(-1)}
                />
            </div>
            <main className="h-full w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Unconnected
