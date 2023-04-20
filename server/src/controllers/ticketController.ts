import { Request, Response } from 'express';
import ticketService from '@services/ticketService';
import { apiCache } from '@services/cache';
import { Ticket, TicketStatus } from '@prisma/client';

export const createTicket = async (req: Request, res: Response) => {
    const { title, description, projectId, sprintId } = req.body as Ticket;
    const memberId = req.member?.id;

    if (memberId && title && description) {
        try {
            const ticket = await ticketService.createTicket(title, description, projectId, sprintId, memberId);

            return res.status(200).send({
                success: true,
                ticket,
                message: 'Ticket créé avec succès.'
            });
        } catch (error) {
            console.log(error);
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la récupération des tickets.'
            });
        }
    }
};

export const getAllTicketsByProject = async (req: Request, res: Response) => {
    const { projectId, status } = req.params;

    if (projectId && status) {
        try {
            const tickets = await ticketService.getAllTicketsByProject(Number(projectId), status as TicketStatus);

            apiCache.set('tickets', tickets, 60 * 5);

            return res.status(200).send({
                success: true,
                tickets
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la récupération des Tickets.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID du projet, non renseigné.'
        });
    }
};

export const getOneTicket = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }

    try {
        const ticket = await ticketService.getOneTicket(Number(id));

        return res.status(200).send({
            success: true,
            ticket
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Ticket inconnu en base de données.'
        });
    }
};

export const updateTicket = async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'ok'
    });
};

export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== null) {
        try {
            await ticketService.deleteTicket(Number(id));

            return res.status(200).send({
                success: true,
                message: 'Ticket supprimé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la suppression du Ticket.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }
};
