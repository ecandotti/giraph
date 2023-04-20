import React from 'react'
import logo from '@assets/images/logo.png'
import { ROUTER_URLS } from '@services/routers/urls'
import { useNavigate } from 'react-router-dom'
import { AppConfig } from '@configs/app'

const Footer: React.FC = () => {
    const navigate = useNavigate()

    return (
        <footer className="bg-slate-200 text-slate-800">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between gap-8 px-4 sm:px-0 py-10">
                <div className="flex-1">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(ROUTER_URLS.HOME)}>
                        <img src={logo} width={30} height={30} />
                        <h2 className="font-bold">{AppConfig.appName}</h2>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-6">Liens rapide</h2>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <a href={ROUTER_URLS.LOGIN} className="hover:pl-4 transition-all">
                                Connexion
                            </a>
                        </li>
                        <li>
                            <a href={ROUTER_URLS.REGISTER} className="hover:pl-4 transition-all">
                                S'inscrire
                            </a>
                        </li>
                        <li>
                            <a href={ROUTER_URLS.MENTIONS_LEGALES} className="hover:pl-4 transition-all">
                                Mentions légales
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-6">Nous contacter</h2>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:pl-4 transition-all">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:pl-4 transition-all">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:pl-4 transition-all">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-slate-300 text-center">
                Copyright © {new Date().getFullYear()} {AppConfig.appName}
            </div>
        </footer>
    )
}

export default Footer
