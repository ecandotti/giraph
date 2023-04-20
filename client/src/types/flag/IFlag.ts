import { ITicket } from '../ticket/ITicket'

export interface IFlag {
    id: number
    title: string
    description: string
    ticket?: ITicket
    ticketId?: number
    updatedAt: Date
    createdAt: Date
}
