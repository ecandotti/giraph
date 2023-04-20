import { createSlice } from '@reduxjs/toolkit'
import { IProjectState } from '@/types/states/IProjectState'

const initialState: IProjectState = {
    id: null,
    sprintId: null,
    loading: false,
    error: null
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, { payload }) => {
            state.id = payload.id
            state.sprintId = payload.sprintId
            state.loading = false
            state.error = null
        },
        clearProject: state => {
            state.id = null
            state.sprintId = null
            state.loading = false
            state.error = null
        }
    }
})

export const { setProject, clearProject } = projectSlice.actions

export default projectSlice.reducer
