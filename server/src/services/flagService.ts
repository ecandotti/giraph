import { Flag } from '@prisma/client';
import { prisma } from '@services/orm/prisma';

const createFlag = async (title: string, description: string, ticketId: number): Promise<Flag | null> => {
    return await prisma.flag.create({
        data: {
            title,
            description,
            ticket: {
                connect: {
                    id: ticketId
                }
            }
        }
    });
};

const getAllFlags = async (): Promise<Flag[]> => {
    return await prisma.flag.findMany();
};

const getOneFlag = async (id: Number): Promise<Flag | null> => {
    return await prisma.flag.findUnique({
        where: { id: Number(Number) }
    });
};

const updateFlag = () => {
    return;
};

const deleteFlag = async (id: Number): Promise<Flag> => {
    return await prisma.flag.delete({
        where: { id: Number(id) }
    });
};

export default {
    createFlag,
    getOneFlag,
    getAllFlags,
    updateFlag,
    deleteFlag
};
