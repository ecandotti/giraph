import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { IMemberState } from '@/types/states/IMemberState'
import { IMember } from '@/types/member/IMember'
import { loginMember, registerMember } from '@features/member/memberAction'

const initialState: IMemberState = {
    token: localStorage.getItem('token') ?? null,
    id: null,
    email: null,
    loading: false,
    error: null
}

export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        getMemberDetails: state => {
            const tokenMember = localStorage.getItem('token')
            if (tokenMember !== null) {
                const { id, email }: IMember = jwtDecode(tokenMember)
                state.token = tokenMember
                state.id = id
                state.email = email
            }
        },
        logoutMember: state => {
            localStorage.removeItem('token')
            state.token = null
            state.id = null
            state.email = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginMember.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loginMember.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.email = payload.email
                state.loading = false
                state.error = null
            })
            .addCase(loginMember.rejected, (state, { payload }: any) => {
                state.token = null
                state.id = null
                state.email = null
                state.loading = false
                state.error = payload.message
            })
            .addCase(registerMember.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(registerMember.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.loading = false
                state.error = null
            })
            .addCase(registerMember.rejected, (state, { payload }: any) => {
                state.token = null
                state.id = null
                state.email = null
                state.loading = false
                state.error = payload.message
            })
    }
})

export const { getMemberDetails, logoutMember } = memberSlice.actions

export default memberSlice.reducer
