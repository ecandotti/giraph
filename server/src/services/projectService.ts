import { Project } from '@prisma/client';
import { prisma } from '@services/orm/prisma';

const createProject = async (title: string, description: string, memberProfileId: number): Promise<Project | null> => {
    return await prisma.project.create({
        data: {
            title,
            description,
            ownerId: memberProfileId,
            sprints: {
                create: {}
            }
        },
        include: {
            sprints: true
        }
    });
};

const getAllProjects = async (): Promise<Project[]> => {
    return await prisma.project.findMany({
        include: {
            sprints: true
        }
    });
};

const getOneProject = async (id: Number): Promise<Project | null> => {
    return await prisma.project.findUnique({
        where: { id: Number(id) }
    });
};

const updateProject = () => {
    return;
};

const deleteProject = async (id: Number): Promise<Project> => {
    return await prisma.project.delete({
        where: { id: Number(id) }
    });
};

export default {
    createProject,
    getAllProjects,
    getOneProject,
    updateProject,
    deleteProject
};
