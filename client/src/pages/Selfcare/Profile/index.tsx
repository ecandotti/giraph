import React from 'react'
import { logoutMember } from '@features/member/memberSlice'
import { useAppDispatch } from '@hooks/redux'

const Profile: React.FC = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="p-4">
            <button onClick={() => dispatch(logoutMember())}>Se deconnecter</button>
        </div>
    )
}

export default Profile
