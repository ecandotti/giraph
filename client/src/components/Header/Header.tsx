import React from 'react'
import logo from '@assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'
import { AppConfig } from '@configs/app'
import { useAppSelector } from '@hooks/redux'

const Header: React.FC = () => {
    const { token } = useAppSelector(state => state.member)
    const navigate = useNavigate()

    return (
        <header className="bg-white fixed top-0 z-10 w-full shadow-xl">
            <div className="mx-auto container flex items-center justify-between py-4">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(ROUTER_URLS.HOME)}>
                    <img src={logo} width={30} height={30} />
                    <h2 className="font-bold">{AppConfig.appName}</h2>
                </div>
                <nav>
                    <ul className="flex items-center gap-4 text-white">
                        {token ? (
                            <li>
                                <a
                                    className="px-6 py-2 bg-black font-bold rounded-full cursor-pointer"
                                    href={ROUTER_URLS.DASHBOARD}
                                >
                                    Tableau de bord
                                </a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <a
                                        className="px-6 py-2 bg-black font-bold rounded-full cursor-pointer"
                                        href={ROUTER_URLS.REGISTER}
                                    >
                                        S'inscrire
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="px-6 py-2 bg-black font-bold rounded-full cursor-pointer"
                                        href={ROUTER_URLS.LOGIN}
                                    >
                                        Connexion
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
