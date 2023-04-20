import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getMemberDetails } from '@features/member/memberSlice'
import { ROUTER_URLS } from '@services/routers/urls'
import { useAppSelector, useAppDispatch } from '@hooks/redux'
import Header from '@components/Selfcare/Header/Header'

const Connected: React.FC = () => {
    const { token } = useAppSelector(state => state.member)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (token === null) {
            navigate(ROUTER_URLS.HOME)
        } else {
            dispatch(getMemberDetails())
        }
    }, [token])

    return (
        <div className="h-full w-full text-slate-800 dark:text-slate-200 transition-colors">
            <Header />
            <main className="h-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Connected
