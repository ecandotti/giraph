import { Member } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '@services/orm/prisma';

const getAllMembers = async (): Promise<Member[]> => {
    return await prisma.member.findMany({
        include: {
            profile: true
        }
    });
};

const getOneMember = async (id: Number): Promise<Member | null> => {
    return await prisma.member.findUnique({
        where: { id: Number(id) },
        include: { profile: true }
    });
};

const updateMember = () => {
    return;
};

const deleteMember = async (id: Number): Promise<Member> => {
    return await prisma.member.delete({
        where: { id: Number(id) }
    });
};

const registerMember = async (email: string, password: string, acceptCGU: boolean): Promise<Member | null> => {
    return await prisma.member.create({
        data: {
            email,
            password: await hash(password, 10),
            profile: {
                create: {
                    acceptCGU,
                    email
                }
            }
        },
        include: {
            profile: true
        }
    });
};

const loginMember = async (email: string): Promise<Member | null> => {
    return await prisma.member.findFirst({
        where: {
            email
        },
        include: { profile: true }
    });
};

export default {
    getOneMember,
    getAllMembers,
    updateMember,
    deleteMember,
    registerMember,
    loginMember
};
