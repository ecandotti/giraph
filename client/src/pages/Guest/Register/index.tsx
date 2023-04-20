import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'
import { IMemberRegister, registerMember } from '@features/member/memberAction'
import { useAppSelector, useAppDispatch } from '@hooks/redux'
import Button from '@components/Button/Button'
import Input from '@components/Input/Input'
import { FaUserCircle } from 'react-icons/fa'
import { BiKey } from 'react-icons/bi'

const Register: React.FC = () => {
    const { loading, error } = useAppSelector(state => state.member)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [memberRegister, setMemberRegister] = useState<IMemberRegister>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        await dispatch(registerMember(memberRegister))
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="bg-white rounded-md shadow-2xl flex flex-col justify-center items-center p-4 sm:p-10 w-full sm:w-auto h-full sm:h-auto">
                <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                    <span className="mr-2">Giraph | Enregistrement</span>
                </div>
                <form className="flex flex-col gap-2 w-full sm:w-72" onSubmit={handleRegister}>
                    <Input
                        label="Email"
                        value={memberRegister.email}
                        onChange={e => setMemberRegister({ ...memberRegister, email: e.target.value })}
                        placeholder="john.doe@gmail.com"
                        className="mb-5"
                        Icon={() => <FaUserCircle />}
                        required
                    />
                    <Input
                        label="Mot de passe"
                        value={memberRegister.password}
                        onChange={e => setMemberRegister({ ...memberRegister, password: e.target.value })}
                        placeholder="*********"
                        type="password"
                        className="mb-5"
                        Icon={() => <BiKey />}
                        required
                    />
                    <Input
                        label="Confirmer mot de passe"
                        value={memberRegister.confirmPassword}
                        onChange={e => setMemberRegister({ ...memberRegister, confirmPassword: e.target.value })}
                        placeholder="*********"
                        type="password"
                        className="mb-5"
                        Icon={() => <BiKey />}
                        required
                    />
                    <span className={`${error ? 'text-red-600' : 'text-white'} text-center`}>{error ?? 'null'}</span>
                    <div className="my-2 mx-auto">
                        <Button title="S'inscrire" loading={loading} type="submit" />
                    </div>

                    <button onClick={() => navigate(ROUTER_URLS.LOGIN)} className="text-center cursor-pointer hover:underline">
                        J'ai déjà un compte
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
