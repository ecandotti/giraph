import { Request, Response } from 'express';
import projectService from '@services/projectService';
import { apiCache } from '@services/cache';
import { Project } from '@prisma/client';

export const createProject = async (req: Request, res: Response) => {
    const { title, description } = req.body as Project;
    const memberId = req.member?.id;

    if (memberId && title && description) {
        try {
            const project = await projectService.createProject(title, description, memberId);

            return res.status(200).send({
                success: true,
                message: 'Projet créé avec succès.',
                project
            });
        } catch (error) {
            console.log(error);
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la création du projet.'
            });
        }
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();

        apiCache.set('projects', projects, 60 * 5);

        return res.status(200).send({
            success: true,
            projects
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Erreur lors de la récupération des projects.'
        });
    }
};

export const getOneProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }

    try {
        const project = await projectService.getOneProject(Number(id));

        return res.status(200).send({
            success: true,
            project
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Project inconnu en base de données.'
        });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'ok'
    });
};

export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== null) {
        try {
            await projectService.deleteProject(Number(id));

            return res.status(200).send({
                success: true,
                message: 'Project supprimé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la suppression du Project.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }
};
