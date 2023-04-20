import React from 'react'
import logo from '@assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'
import { AppConfig } from '@configs/app'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import Button from '@components/Button/Button'
import { logoutMember } from '@features/member/memberSlice'
import { clearProject } from '@features/project/projectSlice'

const Header: React.FC = () => {
    const { token } = useAppSelector(state => state.member)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <header className="bg-white w-full">
            <div className="mx-auto container flex items-center justify-between py-4">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(ROUTER_URLS.HOME)}>
                    <img src={logo} width={30} height={30} />
                    <h2 className="font-bold">{AppConfig.appName}</h2>
                </div>
                <nav>
                    <ul className="flex items-center gap-4 text-white">
                        <li>
                            <Button
                                title="Deconnexion"
                                onClick={() => {
                                    dispatch(clearProject())
                                    dispatch(logoutMember())
                                }}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
