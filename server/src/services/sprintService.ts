import { Sprint } from '@prisma/client';
import { prisma } from '@services/orm/prisma';

const createSprint = async (projectId: number): Promise<Sprint | null> => {
    return await prisma.sprint.create({
        data: {
            project: {
                connect: {
                    id: projectId
                }
            }
        }
    });
};

const getAllSprints = async (): Promise<Sprint[]> => {
    return await prisma.sprint.findMany();
};

const getOneSprint = async (id: Number): Promise<Sprint | null> => {
    return await prisma.sprint.findUnique({
        where: { id: Number(id) }
    });
};

const updateSprint = () => {
    return;
};

const deleteSprint = async (id: Number): Promise<Sprint> => {
    return await prisma.sprint.delete({
        where: { id: Number(id) }
    });
};

export default {
    createSprint,
    getAllSprints,
    getOneSprint,
    updateSprint,
    deleteSprint
};
