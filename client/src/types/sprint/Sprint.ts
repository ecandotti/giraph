import { IProject } from '../project/IProject'
import { ITicket } from '../ticket/ITicket'

export interface ISprint {
    id: number
    number: number
    project: IProject
    projectId: number
    tickets: ITicket[]
    updatedAt: Date
    createdAt: Date
}
