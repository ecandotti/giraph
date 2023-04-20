import { IFlag } from '../flag/IFlag'
import { IMemberProfile } from '../member/IMemberProfile'
import { ISprint } from '../sprint/Sprint'
import { Status } from '../status/Status'

export type ITicket = {
    id: number
    status: Status
    flag?: IFlag
    title: string
    description: string
    sprint: ISprint
    sprintId: number
    memberProfile: IMemberProfile
    memberProfileId: number
    updatedAt: Date
    createdAt: Date
}
