import { Request, Response } from 'express';
import sprintService from '@services/sprintService';
import { apiCache } from '@services/cache';
import { Sprint } from '@prisma/client';

export const createSprint = async (req: Request, res: Response) => {
    const { projectId } = req.body as Sprint;

    if (projectId) {
        try {
            await sprintService.createSprint(projectId);

            return res.status(200).send({
                success: true,
                message: 'Sprint créé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la récupération des Sprints.'
            });
        }
    }
};

export const getAllSprints = async (req: Request, res: Response) => {
    try {
        const Sprints = await sprintService.getAllSprints();

        apiCache.set('Sprints', Sprints, 60 * 5);

        return res.status(200).send({
            success: true,
            Sprints
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Erreur lors de la récupération des Sprints.'
        });
    }
};

export const getOneSprint = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }

    try {
        const Sprint = await sprintService.getOneSprint(Number(id));

        return res.status(200).send({
            success: true,
            Sprint
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Sprint inconnu en base de données.'
        });
    }
};

export const updateSprint = async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'ok'
    });
};

export const deleteSprint = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== null) {
        try {
            await sprintService.deleteSprint(Number(id));

            return res.status(200).send({
                success: true,
                message: 'Sprint supprimé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la suppression du Sprint.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }
};
