import { Request, Response } from 'express';
import flagService from '@services/flagService';
import { apiCache } from '@services/cache';
import { Flag } from '@prisma/client';

export const createFlag = async (req: Request, res: Response) => {
    const { title, description, ticketId } = req.body as Flag;
    try {
        await flagService.createFlag(title, description, Number(ticketId));

        return res.status(200).send({
            success: true,
            message: 'Flag créé avec succès.'
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Erreur lors de la récupération des flags.'
        });
    }
};

export const getAllFlags = async (req: Request, res: Response) => {
    try {
        const flags = await flagService.getAllFlags();

        apiCache.set('flags', flags, 60 * 5);

        return res.status(200).send({
            success: true,
            flags
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Erreur lors de la récupération des flags.'
        });
    }
};

export const getOneFlag = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }

    try {
        const flag = await flagService.getOneFlag(Number(id));

        return res.status(200).send({
            success: true,
            flag
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Flag inconnu en base de données.'
        });
    }
};

export const updateFlag = async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'ok'
    });
};

export const deleteFlag = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== null) {
        try {
            await flagService.deleteFlag(Number(id));

            return res.status(200).send({
                success: true,
                message: 'Flag supprimé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la suppression du Flag.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }
};
