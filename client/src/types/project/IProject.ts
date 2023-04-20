import { IMemberProfile } from '../member/IMemberProfile'
import { ISprint } from '../sprint/Sprint'

export interface IProject {
    id: number
    title: string
    description: string
    ownerId: number
    members: IMemberProfile
    sprints: ISprint[]
    updatedAt: Date
    createdAt: Date
}
