import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'
import { IMemberLogin, loginMember } from '@features/member/memberAction'
import { useAppSelector, useAppDispatch } from '@hooks/redux'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'
import { FaUserCircle } from 'react-icons/fa'
import { BiKey } from 'react-icons/bi'

const Login = () => {
    const { loading, error } = useAppSelector(state => state.member)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [memberLogin, setMemberLogin] = useState<IMemberLogin>({
        email: '',
        password: ''
    })

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        await dispatch(loginMember(memberLogin))
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="bg-white rounded-md shadow-2xl flex flex-col justify-center items-center p-4 sm:p-10 w-full sm:w-auto h-full sm:h-auto">
                <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                    <span className="mr-2">Giraph | Connexion</span>
                </div>
                <form className="flex flex-col gap-2 w-full sm:w-72" onSubmit={handleLogin}>
                    <Input
                        label="Email"
                        value={memberLogin.email}
                        onChange={e => setMemberLogin({ ...memberLogin, email: e.target.value })}
                        placeholder="john.doe@gmail.com"
                        Icon={() => <FaUserCircle />}
                        className="mb-5"
                        required
                    />
                    <Input
                        label="Mot de passe"
                        value={memberLogin.password}
                        onChange={e => setMemberLogin({ ...memberLogin, password: e.target.value })}
                        placeholder="*********"
                        type="password"
                        Icon={() => <BiKey />}
                        className="mb-5"
                        required
                    />
                    <span className={`${error ? 'text-red-600' : 'text-white'} text-center`}>{error ?? 'null'}</span>
                    <div className="my-2 mx-auto">
                        <Button title="Se connecter" loading={loading} />
                    </div>

                    <button onClick={() => navigate(ROUTER_URLS.REGISTER)} className="text-center cursor-pointer hover:underline">
                        Pas de compte ? Inscrivez vous
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
