import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import api from '@services/api'
import { API_URLS } from '@services/api/urls'
import { IMember } from '@/types/member/IMember'

export interface IMemberLogin {
    email: string
    password: string
}

export interface IMemberRegister {
    email: string
    password: string
    confirmPassword: string
}

export const loginMember = createAsyncThunk('user/login', async ({ email, password }: IMemberLogin, { rejectWithValue }) => {
    try {
        const { data } = await api.post(
            API_URLS.LOGIN,
            {
                email,
                password
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        )

        if (data.success as boolean) {
            const { id, email }: IMember = jwtDecode(data.token)
            localStorage.setItem('token', data.token)

            return {
                id,
                email,
                token: data.token
            }
        } else {
            return rejectWithValue({ message: data.message })
        }
    } catch (error) {
        return rejectWithValue({
            message: "Problème avec l'API"
        })
    }
})

export const registerMember = createAsyncThunk(
    'user/register',
    async ({ email, password, confirmPassword }: IMemberRegister, { rejectWithValue }) => {
        try {
            if (password !== confirmPassword) {
                return rejectWithValue({ message: 'Mot de passe différent' })
            }

            const { data } = await api.post(
                API_URLS.REGISTER,
                {
                    email,
                    password
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            )

            if (data.success as boolean) {
                const tokenUser: IMember = jwtDecode(data.token)
                localStorage.setItem('token', data.token)

                return {
                    id: tokenUser.id,
                    email: tokenUser.email,
                    token: data.token
                }
            }

            return rejectWithValue({ message: data.message })
        } catch (error) {
            return rejectWithValue({
                message: "Problème avec l'API"
            })
        }
    }
)
