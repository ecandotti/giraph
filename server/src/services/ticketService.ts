import { connectOrDisconnect } from '@helpers/connectOrDisconnect';
import { Flag, Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@services/orm/prisma';

const createTicket = async (
    title: string,
    description: string,
    projectId: number,
    sprintId: number,
    memberId: number
): Promise<Ticket | null> => {
    return await prisma.ticket.create({
        data: {
            title,
            description,
            project: {
                ...connectOrDisconnect(Number(projectId))
            },
            sprint: {
                ...connectOrDisconnect(Number(sprintId))
            },
            memberProfile: {
                ...connectOrDisconnect(Number(memberId))
            }
        }
    });
};

const getAllTicketsByProject = async (projectId: number, status: TicketStatus): Promise<Ticket[]> => {
    return await prisma.ticket.findMany({
        where: {
            projectId,
            status
        }
    });
};

const getOneTicket = async (id: Number): Promise<Ticket | null> => {
    return await prisma.ticket.findUnique({
        where: { id: Number(id) }
    });
};

const updateTicket = () => {
    return;
};

const deleteTicket = async (id: Number): Promise<Ticket> => {
    return await prisma.ticket.delete({
        where: { id: Number(id) }
    });
};

export default {
    createTicket,
    getAllTicketsByProject,
    getOneTicket,
    updateTicket,
    deleteTicket
};
